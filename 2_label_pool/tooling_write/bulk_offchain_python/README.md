# Python Offchain Attestation

This script demonstrates how to sign and submit an offchain attestation to the EAS contract using Python. It encodes label data, sign off the label locally, calculates an offchain UID and then posts the attestation to the EAS API endpoint.

## Features

- **Contract Interaction:** Connects to an Ethereum node using Web3.py.
- **JSON Encoding & ABI Encoding:** Converts label metadata to a JSON string and ABI encodes the data.
- **Local Signing:** Signs transactions locally using your Ethereum wallet before submitting.
- **UID Calculation:** Implements a function to compute the offchain attestation UID (v2).
- **API Submission:** Formats and posts the attestation to EAS.

## Requirements

- Python 3.8 or later
- An Ethereum wallet (no need for funds in the wallet as we are only signing locally)
- Required Python packages (see `requirements.txt`):
  - `web3`
  - `eth_abi`
  - `eth_account`
  - `eth_keys`
  - `requests`

## Setup and Installation

0. **Create a Virtual Environment (Optional but Recommended):**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

1. **Install the Required Packages:**

   The `requirements.txt` file is already provided in this project. Install all dependencies by running:

   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. **Update Wallet Credentials:**
   - Replace the placeholder `address` with your Ethereum wallet address.
   - Replace `private_key` with your wallet’s private key in the script.

2. **Label Metadata and Schema:**
   - The script uses the OLI Label Pool Schema v1.0.0 (`0xb763e62d940bed6f527dd82418e146a904e62a297b8fa765c9b3e1f0bc6fdd68`).
   - Modify `chain_id`, `contract_address`, and `tags_json` values to your label metadata.

3. **Ethereum Node & Network:**
   - The script is configured for Base Sepolia testnet by default (`rpc = 'https://sepolia.base.org'`, `rpc_chain_number = 84532` and `api_url = https://base-sepolia.easscan.org/offchain/store`).
   - For production, update these values to use Base mainnet.

## Usage

Once configured, run the script.

The script will perform the following steps:

- Connect to the Ethereum node.
- Load and encode label data into a JSON string and ABI encode it.
- Build the attestation data structure with a random salt and current timestamp.
- Sign the EIP-712 typed data locally using your wallet.
- Calculate an offchain UID for the attestation.
- Format the attestation payload and post it to the specified API endpoint.
- Print the signed message, UID, payload, and the API response.

## Testing Environment

The script is currently set up to use Base Sepolia testnet. For production deployment, update `rpc`, `rpc_chain_number`, and `api_url` to use Base mainnet.
