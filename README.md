# Open Labels Initiative
*A standardized framework and data model for EVM address labeling*

List of official OLI tags: [tag_defintions.yml](https://github.com/openlabelsinitiative/oli/blob/main/tag_definitions.yml).

This [Google Calendar](https://calendar.google.com/calendar/u/3?cid=MmQ0MzYxNzQ3ZGFiY2M3ZDJkZjk0NjZiYmY3MmNmZDUwZTNjMjE2OTQ4YzgyNmI4OTBmYjYyN2VmNGRjNjQ4OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t) tracks all upcoming development meetings.

## Goal
This initiative aims to tackle the issue of isolated and non-standardized contract and wallet labeling datasets within the blockchain data community. By introducing a standardized framework for smart contract and wallet labels we advocate for the consolidation into a single, universally accessible data structure utilized by various data providers. Additionally, we also aim to function as an aggregator for labeling tools (i.e. automated ERC detection, activity tagging, etc.).

The Ethereum Foundation funded this effort as part of the [Data Collection Grants](https://esp.ethereum.foundation/data-collection-grants). This standardized data structure was part of their [wish list](https://notes.ethereum.org/@drigolvc/DataCollectionWishlist) and other foundations and data teams also expressed interest in the past.

## Tagging
All labeling takes place by assigning pre-defined tags with values to addresses. Tags are a flexible solution that isn't as prescriptive as other options. Each address can have multiple tags assigned but each tag_id can only be assigned once per address.

To keep some structure, OLI will manage and track the definition of the `oli.TAG` namespace. These tags (the tag definition, not the actual mapping) have to be approved through PRs to the OLI repo. 
A list of approved tags can be found here: [here](https://github.com/openlabelsinitiative/oli/blob/main/tag_definitions.yml).

There is also a discussion to make other namespaces (i.e. aave, maker, uniswap, etc.) available to these specific projects to keep the quality of labels as high as possible.

## Tooling
- [growthepie - Layer 2 Smart Contract Labels](https://labels.growthepie.xyz/)

## Usage
### Tagging Addresses
- **Defining Tags:**
Review the list of approved tags available in the `tag_definitions.yml` file. If your required tag doesn't exist yet, submit a pull request to the OLI repository to propose a new tag or suggest modifications to existing ones.
- **Assigning Tag Values to Addresses:** To tag addresses with relevant labels, please use one of the frontends provided here: **WIP**

Sample data for tag mappings on OP Mainnet (eip155-10) and Base (eip155-8453) can be found [here](https://github.com/openlabelsinitiative/OLI/tree/main/sample_data).

A short excerpt:
```
[
    {
        "address": "0x087000A300DE7200382b55D40045000000E5d60E",
        "chain_id": "eip155-10",
        "name": "Aggregate3",
        "owner_project": "worldcoin",
        "usage_category": "airdrop",
        "deployment_tx": "0xdd0f9cfb373020dd8d71c22d0853ac5d3ba1911ead94177ee09737f74a18b3d2",
        "deployer_address": "0x7d896339A80DD38bC3BbB04383894C62b2eF2585",
        "deployment_date": "2023-09-23 19:55:13"
    },
    {
        "address": "0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1",
        "chain_id": "eip155-10",
        "name": "WLD",
        "owner_project": "worldcoin",
        "usage_category": "fungible_tokens",
        "deployment_tx": "0x3f3231f6f4a036901a06d79a92ef7ffaedc81a8470126f4fdb436f7a57213de8",
        "deployer_address": "0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2",
        "deployment_date": "2023-07-19 13:51:49"
    },
    {
        "address": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        "chain_id": "eip155-10",
        "name": "USDT",
        "owner_project": "tetherto",
        "usage_category": "stablecoin",
        "deployment_tx": null,
        "deployer_address": null,
        "deployment_date": null
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

## Data model
The dbml definition for the SQL representation of the data model can be found [here](https://github.com/openlabelsinitiative/oli/blob/main/data_model/data_model.dbml).
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
