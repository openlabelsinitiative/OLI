// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { SchemaResolver } from "EAS/SchemaResolver.sol";
import { IEAS, Attestation } from "EAS/IEAS.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A schema resolver that checks whether the sender is the owner of the contract behind attestation.recipient.
 */
contract OwnerRecipientResolver is SchemaResolver {

    constructor(IEAS eas) SchemaResolver(eas) {}

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal view override returns (bool) {
        // Return false if the attestation.recipient field is empty (zero address)
        if (attestation.recipient == address(0)) {
            return false;
        }

        // First we check if a OwnableCheck should be performed
        bool ownableCheck = extractOwnableCheckFromData(attestation.data);

        // If OwnableCheck false, allow attestation
        if (!ownableCheck) {
            return true;
        }

        // First we make sure the attestation.recipient is a contract, else return false
        if (attestation.recipient.code.length == 0) {
            return false;
        }

        // Second we make sure the input chain_id matches chainId
        uint256 currentChainId;
        assembly {
            currentChainId := chainid()
        }
        
        uint256 expectedChainId = extractChainIdFromData(attestation.data);
        if (currentChainId != expectedChainId) {
            return false;
        }

        // Third we cast the recipient address to Ownable
        Ownable ownableContract = Ownable(attestation.recipient);

        try ownableContract.owner() returns (address owner) {
            bool isOwner = attestation.attester == owner;
            return isOwner;
        } catch {
            return false;
        }
    }

    function extractChainIdFromData(bytes memory data) internal pure returns (uint256) {
        require(data.length >= 32, "Data too short"); // Make sure we have enough data to read from position 3
        
        // The chain ID is at the first 32-byte slot in the data
        uint256 extractedValue;
        assembly {
            extractedValue := mload(add(data, 32))
        }
        
        return extractedValue;
    }

    function extractOwnableCheckFromData(bytes memory data) internal pure returns (bool) {
        require(data.length >= 64, "Data too short");
        
        // Extract the OwnerCheck from position 2, but we're only interested in the last bit
        uint256 extractedValue;
        assembly {
            extractedValue := mload(add(data, 64)) // Load the first 64 bytes
            extractedValue := and(extractedValue, 0x1) // Mask only the last bit
        }
        
        return extractedValue == 1;
    }

    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }
}