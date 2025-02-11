# Bulk Attestation Uploader

This script allows bulk attesting and uploading of labels to the OLI Label Pool by signing each attestation before submitting it to the EAS IPFS servers (offchain). Every attestation signatures is validated by the EAS IPFS server. The input is a CSV file containing labels in the [OLI-compliant Data Model format](/1_data_model/README.md) and the script processes each row iteratively, attesting one by one.

## Features

- Bulk attestation of labels from a CSV file  
- Local signing of attestations (schema v1.0.0)
- Submit signed attestations to the EAS network  
- Generates attestation logs, including success and error details  

## Requirements

- Node.js (version 16 or later)
- npm (Node Package Manager)
- A valid Ethereum private key (no need for funds on that wallet)

## Usage

0. Navigate to the repository:

   ```bash
   cd 2_label_pool/tooling_attesting/bulk_offchain_typescript
   ```
   
1. Install the required packages by running:

   ```bash
   npm install
   ```

2. Compile the TypeScript files:

   ```bash
   npm run build
   ```

3. Run the compiled script for `index.ts`:

   ```bash
   node dist/index.js
   ```

## Important Preparations

1. Prepare your CSV file containing the attestation data. In addition to `chain_id` and `address`, all column names must match the OLI-compliant `tag_id`s as defined in [tag_definitions.yaml](/1_data_model/tags/tag_definitions.yml).

   An example CSV file can be found [here](/2_label_pool/tooling_attesting/bulk_offchain_typescript/example-labels.csv).

   Refer to [tag_definitions.yml](/1_data_model/tags/tag_definitions.yml) for a detailed explanation of each tag and its data type.

2. Place your converted CSV file in the project's root directory (2_label_pool/tooling_attesting/bulk_offchain_typescript).

3. Add the `privateKey` variable with your private key (no funds required in the wallet, as it is used solely for reputation tracking + offchain signing) and the `fileContent` variable with your CSV file name.

## Testing Environment

The script is built for Base and directly attests to the live OLI Labels Pool.  
If you want to test first, use the following Base Sepolia testnet environment:
 
- JsonRpcProvider: `https://sepolia.base.org`
- schemaUID: `0xb763e62d940bed6f527dd82418e146a904e62a297b8fa765c9b3e1f0bc6fdd68`
- baseURL: `https://base-sepolia.easscan.org/`
- GraphQL: `https://base-sepolia.easscan.org/graphql`
