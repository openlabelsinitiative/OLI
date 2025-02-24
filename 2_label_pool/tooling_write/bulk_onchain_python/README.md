# Python Attestation Script

This script demonstrates how to sign and submit an onchain attestation to the EAS contract using Python, Web3.py and eth_abi. It encodes label data in JSON (OLI-compliant format) and builds a transaction that is locally signed before sending it to the blockchain.

## Features

- **Contract Interaction:** Loads and interacts with the EAS contract using Web3.py.
- **Signing:** Signs transactions locally using your Ethereum wallet before sending them to the mempool.
- **JSON Encoding:** Converts a dictionary of tag_ids to a JSON string for ABI encoding.
- **Transaction Building:** Constructs, signs and submits an attestation transaction to the network.

## Requirements

- Python 3.8 or later
- An Ethereum wallet (funds are required, because we are attesting onchain here)
- Access to an Ethereum node (e.g., Base: `https://mainnet.base.org`)

## Setup and Installation

0. **Create a Virtual Environment (Optional but Recommended):**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

1. **Install the Required Packages:**

   ```bash
   pip install web3
   ```

## Configuration

1. **Update Wallet Credentials:**
   - Replace the placeholder `address` with your Ethereum wallet address.
   - Replace `private_key` with your wallet’s private key.

2. **Verify the Schema and RPC URL:**
   - The script uses the OLI Label Pool Schema v1.0.0 (`0xb763e62d940bed6f527dd82418e146a904e62a297b8fa765c9b3e1f0bc6fdd68`).
   - The script is set to use Base Sepolia Testnet by default. For production, update the `rpc` and `chainId` variables to Base.

3. **Load Your Labels:**
   - Load your label by changing `chain_id`, `contract_address` and `tags_json` with your metadata.

## Usage

Once you have configured the script, run it with:

```bash
python script.py
```

The script will:

- Connect to the Ethereum node.
- Load the EAS contract.
- Convert your label data to a JSON string and ABI encode it.
- Build, sign, and submit the attestation transaction.
- Wait for the transaction receipt and print the transaction hash upon success.

## Testing Environment

The script is set up for Base Sepolia testnet already.

For production deployments, update the `rpc` and `chainId` variables to Base.
