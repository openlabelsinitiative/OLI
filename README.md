# Open Labels Initiative
*A standardized framework and data model for EVM address labeling*

**CAREFUL, BREAKING CHANGES MIGHT STILL OCCUR**

List of official OLI tags: [tag_defintions.yml](https://github.com/openlabelsinitiative/oli/blob/main/tag_definitions.yml).

## Goal
This initiative aims to tackle the issue of isolated and non-standardized contract and wallet labeling datasets within the blockchain data community. By introducing a standardized framework for smart contract and wallet labels we advocate for the consolidation into a single, universally accessible data structure utilized by various data providers. Additionally, we also aim to function as an aggregator for labeling tools (i.e. automated ERC detection, activity tagging, etc.).

The Ethereum Foundation funded this effort as part of the [Data Collection Grants](https://esp.ethereum.foundation/data-collection-grants). This standardized data structure was part of their [wish list](https://notes.ethereum.org/@drigolvc/DataCollectionWishlist) and other foundations and data teams also expressed interest in the past.

## Tagging
All labeling takes place by assigning pre-defined tags with values to addresses. Tags are a flexible solution that isn't as prescriptive as other options. Each address can have multiple tags assigned but each tag_id can only be assigned once per address.

To keep some structure, OLI will manage and track the definition of the `oli.TAG` namespace. These tags (the tag definition, not the actual mapping) have to be approved through PRs to the OLI repo. 
A list of approved tags can be found here: [here](https://github.com/openlabelsinitiative/oli/blob/main/tag_definitions.yml).

There is also a discussion to make other namespaces (i.e. aave, maker, uniswap, etc.) available to these specific projects to keep the quality of labels as high as possible.

## Usage
### Tagging Addresses
- **Defining Tags:**
Review the list of approved tags available in the `tag_definitions.yml` file. If your required tag doesn't exist yet, submit a pull request to the OLI repository to propose a new tag or suggest modifications to existing ones.
- **Assigning Tag Values to Addresses:** To tag addresses with relevant labels, please use one of the frontends provided here: **WIP**

This is an example for tags that are assigned to the [Uniswap V3 Router](https://optimistic.etherscan.io/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45) on OP Mainnet (eip155-10).
```
"TagMapping": [
  {
    "address": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    "chain_id": "eip155-10",
    "tag_id": "oli.name",
    "value": "Router 2"
  },
  {
    "address": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    "chain_id": "eip155-10",
    "tag_id": "oli.is_contract",
    "value": True
  },
  {
    "address": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    "chain_id": "eip155-10",
    "tag_id": "oli.owner_project",
    "value": "uniswap"
  },
  {
    "address": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    "chain_id": "eip155-10",
    "tag_id": "oli.usage_category",
    "value": "dex"
  },
  {
    "address": "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    "chain_id": "eip155-10",
    "tag_id": "oli.version",
    "value": 3
  }
]
```


### Integrating Tags into Applications
- **Data Model Integration:** Utilize the standardized data model provided by OLI to incorporate tagged addresses into your applications and platform.
- **Filtering and Analysis:** Leverage namespaces to filter and analyze addresses based on specific criteria, such as protocol name, security requirements, or user activity. You can use following frontends for ease-of-access: **WIP**

## Pre-Defined Valuesets
Certain tags can only take values from pre-defined valuesets. The most important examples are projects and usage categories.

### Projects
One big part of tagging is the correct association with projects. Certain tags (i.e. oli.deployer_project) link to projects. To avoid collisions and other issues, a clean project registry is necessary. The most complete project repository to date is the [OSS-directory](https://github.com/opensource-observer/oss-directory/tree/main). Project names have to be from here.

### Categories
For the sake of standardization, we also defined a valueset for categories that have to be used for the `oli.usage_category` tag. The full list (with hierarchy mapping) can be found [here](https://github.com/openlabelsinitiative/OLI/blob/main/valuesets/category_definitions.yml).

### Chains
A clean linking to chains is also required. The most commonly used chain naming standard is [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md). A full registry for EVM-based chains can be found [here](https://github.com/ethereum-lists/chains).

## Tooling
WIP: a repository of references to labeling tools

## Data model
The dbml definition for the SQL representation of the data model can be found [here](https://github.com/openlabelsinitiative/oli/blob/main/data_model.dbml).
This link shows the interactive [dbdiagram](https://dbdiagram.io/d/OLI-660bbef003593b6b61f058cb).

## Datasets 
OLI won’t store any datasets. This initiative's goal is to align on a standardized data structure for labels which will make it easier to sync different datasets. It will also align on the definition of categories and naming conventions. Label databases will still be in the hands of independent data teams. growthepie and walletlabels commit to making their data publicly available via API endpoints and hope that other data teams will join this effort for democratized access to labels. 

## Roadmap
The current high level vision for the effort can be broken down in 3 steps:

- [x] Alignment on labeling framework and putting all definitions in place.
- [ ] Set up a council that manages the GitHub and new tag_ids/ other changes have to go through it.
- [ ] Experimentation with address/tag mappings with different front- and backends. Walletlabels and growthepie will both adapt the new OLI standard and start to experiment with the best ways to crowdsource the labeling effort. We'll run separate frontends and databases that can easily sync from each other. Main challenge is label confidence. Most useful approach is probably to go quality over quantity first. We encourage other data teams to do the same and stress test the framework.
- [ ] Potentially decentralize this effort.  Based on the outcome from step 2 we will re evaluate more decentralized solutions like EAS and others. Ideal outcome would be a framework that allows us to easily read tags and their confidence levels from onchain data.

## Contributors
### Founding members
These teams applied for grants with the Ethereum Foundation and started building out the core structure.
- [growthepie](https://www.growthepie.xyz/): Layer 2 analytics platform with focus on labeling smart contracts on layer 2s.

![growthepie logo](https://i.ibb.co/54W8j8K/Group-165.png)

- [walletlabels](https://www.walletlabels.xyz/): Wallet labeling platform with focus on labels for Ethereum as well as social labels / labeling of EOAs.

![Walletlabels logo](https://i.ibb.co/DMkw90y/Wallet-Labels-logo.png)

### Sponsors
- [Ethereum Foundation](https://ethereum.foundation/)

### Other Supporters
Individuals or data teams that are involved in active feedback for this initiative and/or opened up their labeled databases.

- [Carl Cervone](https://github.com/ccerv1) & [Raymond Cheng](https://github.com/ryscheng) | [Open Source Observer](https://github.com/opensource-observer)
- [Michael Silberling](https://github.com/MSilb7) | [OP Labs](https://www.oplabs.co/)
- [Storm](https://github.com/sslivkoff) & [samczsun](https://github.com/samczsun/) | [Paradigm](https://www.paradigm.xyz/)
- [Dune](https://dune.com/)
- [Allium](https://www.allium.so/)
- [Blockscout](https://www.blockscout.com/)
- [Artemis](https://www.artemis.xyz/)
- [Routescan](https://routescan.io/)
- [Guild](https://guild.xyz/)
