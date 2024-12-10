# OLI Data Entry / Contract Labeling

** OLI DATA ENTRY IS CURRENTLY IN BETA - USE AT OWN RISK **

OLI Data Entry focuses specifically on the process of data entry for address labels. While the broader OLI framework defines how labels are stored, OLI Data Entry provides the tools and guidelines necessary for labeling EVM smart contracts as part of a collaborative community effort.

This repository provides the latest schemas for attestations and a step by step workflow for creating and retrieving contract labels. The goal is to establish a single, decentralized point of data entry, ensuring an open and fair system where:

- **Labelers** only need to label their contracts once, making their labels universally accessible to everyone.
- **Data Consumers** can reliably and transparently access this information without duplicating efforts.

With OLI Data Entry, we try to fix the labeling challenge by providing a straightforward, fair and universally accessible solution, enabling everyone to benefit from crowdsourced contract labels.

## Workflow

### **Data Entry (Creating Attestations)**

Users can label a contract by attesting to the [EAS smart contract](https://github.com/ethereum-attestation-service/eas-contracts?tab=readme-ov-file#optimism). Make sure you are attesting to the [latest OLI schema hash](EAS_schema_versioning.yml):

1. **Attestation Front-End:**
While our custom white label front end is under development, please use the EAS dApp [here](https://optimism.easscan.org/attestation/attestWithSchema/0xacb55ee4f0b0bf4987ba23f863e41e78ea1863e1c5aa881c520d16dae76a0c7b) and make sure you attest to the [latest schema](EAS_schema_versioning.yml).

2. **Connect Your Wallet:**
Ensure your wallet is connected and you are on the correct network.

3. **Create an Attestation**

    - **Recipient**: Enter the address to be labeled.

    - **Chain ID**: Provide the chain ID corresponding to the location of the address you want to label.

    - **Ownership Proof**: If you are the owner of the contract you are labeling, toggle this option to `True`. This will prove that you are the owner and that your label is of high quality. Otherwise, set it to `False`.
      - This feature only works if you are on the same chain where the contract is deployed.
      - The address from which you send the transaction must also be the owner of the contract you are attesting. The contract must implement the OpenZeppelin `Ownable.sol` extension.  

    - **OLI-Compliant Labels**: Provide as much detail as possible for each label in the attestation. Leaving fields blank, especially if they are redundant, is acceptable.

      - **True/False Fields**:  
        For fields such as `is_eoa`, `is_contract`, `is_factory_contract`, `is_proxy`, and `is_safe_contract`, use the following values:  
          - `0`: No value.  
          - `1`: True.  
          - `2`: False.  
        
      - Refer to [tag_definitions.yml](../tags/tag_definitions.yml) for a detailed explanation of each tag.

4. **Sign and Submit Onchain or Offchain:**
   - Select your preferred submission method: onchain or offchain.  
   - Use your wallet to sign the attestation.

### **Data Retrieval**

coming soon