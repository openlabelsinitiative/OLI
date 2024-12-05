# OLI Data Entry / Contract Labeling

** OLI DATA ENTRY IS CURRENTLY IN BETA - USE AT OWN RISK **

OLI Data Entry focuses specifically on the process of data entry. While the broader OLI framework defines how labeled addresses are stored, OLI Data Entry provides the tools and guidelines necessary for labeling EVM smart contracts as part of a collaborative community effort.

Using the [Ethereum Attestation Service (EAS)](https://attest.org/), this repository provides schemas and workflow for creating and retrieving contract labels. The goal is to establish a single, decentralized point of data entry, ensuring an open and fair system where:

- **Labelers** only need to label their contracts once, making their labels universally accessible to everyone.
- **Data Consumers** can reliably and transparently access this information without duplicating efforts. 

With OLI Data Entry, we address the labeling challenge by providing a straightforward, fair and universally accessible solution, enabling everyone to benefit from crowdsourced contract labels.

## Workflow

### 1. **Data Entry (Creating Attestations)**

Users can label a contract by attesting to the [correct schema](data_entry/EAS_schema_versioning.yml):

1. **Visit the Attestation Front-End:**
While our custom white label front end is under development, please use the EAS Attestation dApp [here](https://optimism.easscan.org/attestation/attestWithSchema/0xacb55ee4f0b0bf4987ba23f863e41e78ea1863e1c5aa881c520d16dae76a0c7b) and make sure to use the [newest schema](data_entry/EAS_schema_versioning.yml).

2. **Connect Your Wallet:**
Ensure your wallet is connected and you are on the correct network.

### 3. **Create an Attestation**

- **Recipient**: Enter the address to be labeled.

- **Chain ID**: Provide the chain ID corresponding to the address you want to label.

- **Ownership Proof**:  If you are the owner of the contract you wish to label, toggle this option to "True". Else use "False.
  - This feature works only if you are on the chain where the contract is deployed.  
  - Your address must be the owner of the contract, verified using the OpenZeppelin Ownable extension.

- **OLI-Compliant Labels**: Provide as much detail as possible for each label in the attestation. Leaving fields blank, especially if they are redundant, is acceptable.

  - **True/False Fields**:  
    For fields such as `is_eoa`, `is_contract`, `is_factory_contract`, `is_proxy`, and `is_safe_contract`, use the following values:  
      - `0`: No value.  
      - `1`: True.  
      - `2`: False.  
    
  - Refer to [tag_definitions.yml](tags/tag_definitions.yml) for a detailed explanation of each tag.

4. **Sign and Submit Onchain or Offchain:**
   - Select your preferred submission method: onchain or offchain.  
   - Use your wallet to sign the attestation.

### 2. **Data Retrieval**

coming soon