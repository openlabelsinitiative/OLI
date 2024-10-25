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
        
        // Return true if the attestation.recipient field is empty (zero address)
        if (attestation.recipient == address(0)) {
            return true;
        }

        // Check if the attestation.recipient is a contract
        if (attestation.recipient.code.length == 0) {
            return false;
        }

        // Extract _address field from attestation.data
        address _address = extractAddressFromData(attestation.data);

        // Only allow the attestation if the to be attested contract _address is also the recipient
        if (attestation.recipient != _address) {
            return false;
        }

        // Try to cast the recipient address to Ownable
        Ownable ownableContract = Ownable(attestation.recipient);

        try ownableContract.owner() returns (address owner) {
            // Check if the sender is the owner of the contract
            return attestation.attester == owner;
        } catch {
            // If the call to owner() fails, it means the contract is not Ownable
            return false;
        }
    }

    function extractAddressFromData(bytes memory data) internal pure returns (address) {
        require(data.length >= 32, "Data too short");
        
        // The address is at index 12 of the first 32 bytes (right-aligned in ABI encoding).
        address extractedAddress;
        assembly {
            extractedAddress := mload(add(data, 32)) // Load the first 32 bytes, which includes the address at offset 12.
            extractedAddress := and(extractedAddress, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF) // Mask the last 20 bytes (address size).
        }
        
        return extractedAddress;
    }


    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }
}