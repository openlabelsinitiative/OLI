# Bulk Attestation Uploader

This project allows bulk attesting and uploading of labels to the OLI data pool by signing each attestation before submitting it to the EAS IPFS servers (offchain), which validate the signatures. The input is a CSV file containing labels in the [OLI-compliant format](./data_model) and the script processes each row iteratively, attesting one by one.

---

## Features

- Bulk attestation of labels from a CSV file  
- Local signing of attestations (schema v0.1.1)
- Submit signed attestations to the EAS network  
- Generates attestation logs, including success and error details  

--- 

## Requirements

- Node.js (version 16 or later)
- npm (Node Package Manager)
- A valid Ethereum private key with sufficient funds for gas fees on the Optimism network.

---

## Usage

0. Navigate to the repository:

   ```bash
   cd data_pool/bulk_attesting
   ```
   
1. Install the required packages by running:

   ```bash
   npm install
   ```

2. Compile the TypeScript files:

   ```bash
   npm run build
   ```

3. Run the compiled script for `bulk_attest.ts`:

   ```bash
   node dist/bulk_attest.js
   ```

---

## Important Preparations

1. Prepare your CSV file containing the attestation data. The column names must match the following format exactly ([OLI data model v0.1.1](../attestation_schema/EAS_schema_versioning.yml)), along with their corresponding data types:

   - `address (address)`
   - `chain_id (uint256)`
   - `is_owner (bool)`
   - `is_eoa (uint8)`
   - `is_contract (uint8)`
   - `is_factory_contract (uint8)`
   - `is_proxy (uint8)`
   - `is_safe_contract (uint8)`
   - `name (string)`
   - `deployment_tx (string)`
   - `deployer_address (address)`
   - `owner_project (string)`
   - `deployment_date (uint256)`
   - `erc_type (uint16[])`
   - `erc20_symbol (string)`
   - `erc20_decimals (uint8)`
   - `erc721_name (string)`
   - `erc721_symbol (string)`
   - `erc1155_name (string)`
   - `erc1155_symbol (string)`
   - `usage_category (string)`
   - `version (uint8)`
   - `audit (string)`
   - `contract_monitored (string)`
   - `source_code_verified (string)`

   An example CSV file can be found at: `data_entry/bulk_attesting/example-labels.csv`

   Refer to [tag_definitions.yml](../../data_model/tags/tag_definitions.yml) for a detailed explanation of each tag.

   Important Notes:
   - **Boolean Values**: Columns representing boolean values (e.g., `is_owner`, `is_eoa`) must be converted to `uint8` format:
     - `0` = No Value
     - `1` = True
     - `2` = False
   - **Address Fields**: Any field requiring an address cannot be left empty. If no value is available, use `0x0000000000000000000000000000000000000000`.
   - **Uint Fields**: Any `uint` fields, such as `deployment_date` or `erc20_decimals`, should be set to `0` if no value is provided.
   - **String Fields**: These can be left as `null` if no value is provided.

   For more details on the attestation format, see [data_pool README.md](../README.md).

2. Place your converted CSV file in the project root directory.

3. Replace the `privateKey` variable with your private key (no need for funds in the wallet) and `fileContent` with your csv file name.
