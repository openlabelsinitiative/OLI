# Open Labels Initiative: Label Pool

The OLI Label Pool is a neutral entry point and a shared data pool for OLI-compliant labels. While the [OLI Label Schema](/././1_label_schema/README.md) defines how labels are stored, the Label Pool provides the tools and guidelines for contributing contract labels as part of a collaborative community effort.

The goal with Label Pool is to establish a single, decentralized point of data entry, ensuring an open and fair system where:

- **Labelers / Data Submitters** fill the Label Pool with labels
- **Data Consumers** can reliably and transparently access this information without needing to search around for labels.

With the OLI Label Pool, we address the problem of isolated and unstandardized labels in the web3 space by providing a straightforward, fair and universally accessible solution — enabling everyone to benefit from crowdsourced address labels.

## Accessing The Label Pool

Users can submit a label to the OLI Label Pool by attesting to the [EAS smart contract](https://github.com/ethereum-attestation-service/eas-contracts?tab=readme-ov-file#base) using the [latest OLI schema hash](attestation_schema/EAS_schema_versioning.yml). To allign with the Web3 ethos, all attestations are public, timestamped and signed by an EOA, ensuring transparency and traceability of the contribution's source. *Currently both onchain and offchain attestations are allowed. With lower gas fees we are moving towards full onchain attestations soon.* 

To simplify the labeling process, we provide various tools for submitting and retrieving labels from the OLI Label Pool. Since the system is permissionless, anyone can build their own custom implementation. Below are the tools we offer to make connecting to the Data Pool easier:

### Contributing Labels to The Data Pool

1. **[OLI Attest](https://www.openlabelsinitiative.org/attest)** (*onchain*): A custom frontend that enables users to attest labels individually or in bulk, with integrated wallet support. It also supports CSV uploads and helps discover the most-used contracts that haven't been labeled yet. *Ideal for beginners.*
2. **[OLI Pip Package](tooling_write/python/README.md)** (*onchain & offchain*): Use the official OLI pip package to easily attest labels with Python. *Ideal for Python users and automation workflows.*
3. **[Bulk TypeScript Attestation Script](tooling_write/bulk_offchain_typescript/README.md)** (*offchain*): Uses the EAS SDK to sign attestations and post them to the EAS IPFS server. *Ideal for advanced TypeScript users.*
4. **[EAS Frontend Implementation](https://base.easscan.org/attestation/attestWithSchema/0xb763e62d940bed6f527dd82418e146a904e62a297b8fa765c9b3e1f0bc6fdd68)** (*onchain & offchain*): A minimal frontend for attesting individual labels, with wallet connect support. *Not recommended.*

### Retrieving Labels From The Data Pool

1. **[OLI Search](https://www.openlabelsinitiative.org/attest)**: Browse labels through a beginner-friendly UI. *Best for manual use cases.*
2. **[OLI Pip Package](tooling_write/python/README.md)**: Use the official OLI pip package to query the GraphQL endpoint or download full Parquet exports of all labels. *Ideal for most use cases.*
3. **[GraphQL Sandbox](https://base.easscan.org/graphql)**: Explore the EAS GraphQL sandbox to query all attestations. Note: manual filters are required to isolate data from the OLI Label Pool. *Best suited for advanced GraphQL users with specific use cases.*

### User Segmentation 

We identified 3 core user types as label submitters. They mostly differ in terms of label volume that they submit.

| Submitter                | Volume        | Description | Entry method
  |------------------------|--------------------|-------------|------------
  | **High-volume labelers** | High (1000+)       | Data teams & indexing companies that have automated and highly optimized scripts running to label a high number of smart contracts. | pip package or typescript script |
  | **Casual labelers**      | Medium (5-1000)    | Individuals who have a set of labels they want to submit. Could be analysts collecting labels manually or dApp teams that deployed multiple contracts and want to share metadata. | OLI frontend end or pip package |
  | **Single labelers**      | Low (1-5)         | Individuals submitting a very small amount of labels, usually smart contract deployers who want to make metadata on their smart contract available. | OLI front end |
