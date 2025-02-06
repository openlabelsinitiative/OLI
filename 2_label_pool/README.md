# Label Pool Overview

** OLI DATA ENTRY IS CURRENTLY IN BETA **

OLI Data Entry focuses specifically on the process of data entry for address labels. While the broader OLI framework defines how labels are stored, OLI Data Entry provides the tools and guidelines necessary for labeling EVM smart contracts as part of a collaborative community effort.

This repository provides the latest schemas for attestations and a step by step workflow for creating and retrieving contract labels. The goal is to establish a single, decentralized point of data entry, ensuring an open and fair system where:

- **Labelers / Data Submitters** fill the Label Pool with labels
- **Data Consumers** can reliably and transparently access this information without needing to access multiple sources for labels

With OLI Data Entry, we try to fix the labeling challenge by providing a straightforward, fair and universally accessible solution, enabling everyone to benefit from crowdsourced contract labels.

## Data Submission: Attesting

Users can label a contract by attesting to the [EAS smart contract](https://github.com/ethereum-attestation-service/eas-contracts?tab=readme-ov-file#optimism). There are multiple ways to attest, and we present two options here: using the EAS front end or a bulk attestation tool. Whichever method you choose, ensure that you are attesting to the [latest OLI schema hash](attestation_schema/EAS_schema_versioning.yml).

We identified 3 core user types as label submitters. They mostly differ in terms of label volume that they submit.

| Submitter                | Volume        | Description | Entry method
  |------------------------|--------------------|-------------|------------
  | **High-volume labelers** | High (1000+)       | Data teams & indexing companies that have automated and highly optimized scripts running to label a high number of smart contracts. | Automated via data-pipelines |
  | **Casual labelers**      | Medium (5-1000)    | Individuals who have a set of labels they want to submit. Could be analysts collecting labels manually or dApp teams that deployed multiple contracts and want to share metadata. | CSV/JSON upload |
  | **Single labelers**      | Low (1-5)         | Individuals submitting a very small amount of labels, usually smart contract deployers who want to make metadata on their smart contract available. | Frontend with dropdowns |

### **Attesting: EAS Front End**

1. **EAS Front-End:**
While our custom white label front end is under development, please use the EAS dApp [here](https://optimism.easscan.org/attestation/attestWithSchema/0x5283a290268ebd286c379b633b1f8f8241edb577a074d67a3ceea636461dd13f) and make sure you are attesting to the [latest schema hash](attestation_schema/EAS_schema_versioning.yml).

2. **Connect Your Wallet:**
Ensure your wallet is connected and you are on the correct network (optimism).

3. **Create an Attestation**

    - **Recipient**: Enter the address to be labeled.

    - **Chain ID**: Provide the chain ID corresponding to the location of the address/contract you want to label.

    - **Ownership Proof**: If you are the owner of the contract you are labeling, toggle this option to `True`. This will prove that you are the owner and that your label is of high quality. Otherwise, set it to `False`.
      - This feature only works if you are on the same chain where the contract is deployed.
      - The address from which you send the transaction must also be the owner of the contract you are attesting. The contract must implement the OpenZeppelin `Ownable.sol` extension.  

    - **OLI-Compliant Labels**: Provide as much detail as possible for each label in the attestation. Leaving fields blank, especially if they are unknown, is acceptable. Some fields require a value, therefore it is important to note:

      - **Boolean Values**: Columns representing boolean values (e.g., `is_owner`, `is_eoa`) are using `uint8` format:
        - `0` = No Value
        - `1` = True
        - `2` = False
      
      - **Address Fields**: Any field requiring an address cannot be left empty. If no value is available, use `0x0000000000000000000000000000000000000000`

      - **Uint Fields**: Any `uint` fields, such as `deployment_date` or `erc20_decimals`, should be set to `0` if no value is provided.

      - **String Fields**: These can be left as `null` if no value is provided.

      - Refer to [tag_definitions.yml](../data_model/tags/tag_definitions.yml) for a detailed explanation of each tag.

4. **Sign and Submit Onchain or Offchain:**
   - Select your preferred submission method: onchain or offchain. Default should be set to offchain.
   - Use your wallet to sign the attestation.

### **Attesting: Bulk Attesting**

To bulk attest a CSV file, refer to the directory [bulk_attesting](bulk_attesting/README.md). This TypeScript project provides all the necessary tools to use ethers for signing and submitting the labels.

## Data Retrieval

WIP