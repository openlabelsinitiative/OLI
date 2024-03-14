# Open Labels Initiative
*A standardized framework and data model for EVM address labeling*

Full data model documentation: [dbdocs](https://dbdocs.io/matthias/OLI)

## Goal
This initiative aims to tackle the issue of isolated and non-standardized contract and wallet labeling datasets within the blockchain data community. By introducing a standardized data model for smart contract and wallet labels we advocate for the consolidation into a single, universally accessible data structure utilized by various data providers. Additionally, we also aim to function as an aggregator for labeling tools (i.e. automated ERC detection, activity tagging, etc.)

The Ethereum Foundation funded this effort as part of the [Data Collection Grants](https://esp.ethereum.foundation/data-collection-grants). This standardized data structure was part of their [wish list](https://notes.ethereum.org/@drigolvc/DataCollectionWishlist) and other foundations and data teams also expressed interest in the past (as discussed [here](https://twitter.com/tokenterminal/status/1694103939602608540) by TokenTerminal and MSilb7). 

## Tagging
After long consideration and lots of helpful feedback from many community members we decided: Tags are the way to go.
Tags are a very flexible solution that isn't as prescriptive as other options. Each address can have multiple tags assigned.

In order to keep some structure, OLI will manage and track definition of the oli.TAG namespace. These tags (the tag definition, not the actual labels) have to be approved through PRs to the OLI repo. 
A list of approved tags can be found here: [here](https://github.com/openlabelsinitiative/oli/blob/main/tag_definitions.yml).

There is also a discussion to make other namespaces (i.e. aave. , or uniswap. ) only available to these specific projects in order to keep the quality of labels as high as possible.

## Projects
One big part of tagging is that correct association with projects. Certain tags (i.e. oli.deployer_project) link to projects. In order to avoid collisions and other issues, a clean project registry is necessary. TBD on next steps here.

## Data model (SQL representation)
This is the current suggestion for the data model. The full dbml definition can be found [here](https://github.com/openlabelsinitiative/oli/blob/main/data_model.dbml).
This link shows the interactive dbdiagram: [dbdocs](https://dbdocs.io/matthias/OLI?view=relationships)

## Tooling
WIP: a repository of references to labeling tools

## Datasets 
OLI won’t store any datasets. This initiative's goal is to align on a standardized data structure for labels which will make it easier to sync different datasets. It will also align on the definition of categories and naming conventions. Label databases will still be in the hands of independent data teams. growthepie and walletlabels commit to making their data publicly available via API endpoints and hope that other data teams will join this effort for democratized access to labels. 

## Contributors
### Founding members
These teams applied for grants with the Ethereum Foundation and started building out the core structure.
- [growthepie](https://www.growthepie.xyz/): Layer 2 analytics platform with focus on labeling smart contracts on layer 2s.

![growthepie logo](https://i.ibb.co/cbZ5Bqg/growthepie-logo.png)

- [walletlabels](https://www.walletlabels.xyz/): Wallet labeling platform with focus on labels for Ethereum as well as social labels / labeling of EOAs.

![Walletlabels logo](https://i.ibb.co/DMkw90y/Wallet-Labels-logo.png)

### Sponsors
- [Ethereum Foundation](https://ethereum.foundation/)

### Other Contributors
Other data teams that are involved in active feedback for this initiative and/or opened up their labeled databases.
- TBD
