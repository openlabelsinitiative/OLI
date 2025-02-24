# Open Labels Initiative: Label Pool

The Label Pool is a neutral entry point and a shared data pool for OLI-compliant labels. While the [OLI Data Model](/././1_data_model/README.md) defines how labels are stored, the Label Pool provides the tools and guidelines for contributing contract labels as part of a collaborative community effort.

The goal with Label Pool is to establish a single, decentralized point of data entry, ensuring an open and fair system where:

- **Labelers / Data Submitters** fill the Label Pool with labels
- **Data Consumers** can reliably and transparently access this information without needing to search around for labels.

With the Label Pool, we address the problem of isolated and unstandardized labels in the web3 space by providing a straightforward, fair and universally accessible solution — enabling everyone to benefit from crowdsourced address labels.

## Accessing The Label Pool

Users can submit a label to the Data Pool by attesting to the [EAS smart contract](https://github.com/ethereum-attestation-service/eas-contracts?tab=readme-ov-file#base) using the [latest OLI schema hash](attestation_schema/EAS_schema_versioning.yml). To allign with the Web3 ethos, all attestations are public, timestamped and signed by an EOA, ensuring transparency and traceability of the contribution's source. *Currently both onchain and offchain attestations are allowed. With lower gas fees we are moving towards full onchain attestations soon.* 

To simplify the labeling process, we provide various tools for submitting and retrieving labels from the Data Pool. Since the system is permissionless, anyone can build their own custom implementation. Below are the tools we offer to make connecting to the Data Pool easier:

### Contributing Labels to The Data Pool

1. **[EAS Frontend Implementation](https://base.easscan.org/attestation/attestWithSchema/0xb763e62d940bed6f527dd82418e146a904e62a297b8fa765c9b3e1f0bc6fdd68)** (*onchain & offchain*): A basic frontend that allows users to attest individual labels, featuring a wallet connect button. *To be replaced by our own custom white label front end soon*.
2. **[Bulk TypeScript Attestation Script](tooling_write/bulk_offchain_typescript/README.md)** (*offchain*): Utilizes the EAS SDK to sign attestations and pins them to the EAS IPFS server.
3. **[Bulk Python Attestation Script](tooling_write/bulk_onchain_python/README.md)** (*onchain*): Uses Web3.py to interact with the blockchain and submit attestations.

### Retrieving Labels From The Data Pool

1. **[GraphQL](https://base.easscan.org/graphql)**: Provided by the EAS, this GraphQL endpoint allows querying all attestations with custom filters.  
2. **[GraphQL Python Quick Start](tooling_read/graphql_python/README.md)**: A Jupyter Notebook with basic examples for querying the GraphQL endpoint and applying filters.  

### User Segmentation 

We identified 3 core user types as label submitters. They mostly differ in terms of label volume that they submit.

| Submitter                | Volume        | Description | Entry method
  |------------------------|--------------------|-------------|------------
  | **High-volume labelers** | High (1000+)       | Data teams & indexing companies that have automated and highly optimized scripts running to label a high number of smart contracts. | Automated via data-pipelines |
  | **Casual labelers**      | Medium (5-1000)    | Individuals who have a set of labels they want to submit. Could be analysts collecting labels manually or dApp teams that deployed multiple contracts and want to share metadata. | CSV/JSON upload |
  | **Single labelers**      | Low (1-5)         | Individuals submitting a very small amount of labels, usually smart contract deployers who want to make metadata on their smart contract available. | Frontend with dropdowns |
