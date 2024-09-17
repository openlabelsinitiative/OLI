# Open Labels Initiative
***A standardized framework and data model for EVM address labeling***

Upcoming community calls can be found in our [Google Calendar](https://calendar.google.com/calendar/u/3?cid=MmQ0MzYxNzQ3ZGFiY2M3ZDJkZjk0NjZiYmY3MmNmZDUwZTNjMjE2OTQ4YzgyNmI4OTBmYjYyN2VmNGRjNjQ4OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t)!

## Goal
This initiative tackles the issue of isolated and non-standardized datasets of address labels within the blockchain community. It introduces a flexible, open and community owned data framework for anyone to use and contribute to. 

By aligning on a single framework for address labels, we streamline our labeling efforts, avoid redundant work and make it easier to share datasets within the community.

The OLI repository functions as the community maintainer of the OLI framework. Additionally, it serves as a neutral entity that provides tools for data entry through attestations and automated activity tagging.

## Tagging
Labelling is performed by assigning a pre-defined `tag_id` with a `value` to an `address` & `chain_id` combination. Each address can have as many tags assigned as it wants, but each `tag_id` can only be assigned once per `address`.

* `address`: the hexadecimal public address of a smart contract or externally owned account (EOA)
* `chain_id`: unique identifier as defined by [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md) or [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
* `tag_id`: tag IDs represent a wide range of concepts. For OLI-compliant tags, please refer to [tag_defintions.yml](https://github.com/openlabelsinitiative/oli/blob/main/tag_definitions.yml). We encourage anyone to submit a PR to contribute new tags to the framework. The framework also allows for other tag ID namespaces for more detailed project based labelling. 
* `value`: Each `tag_id` has a value field that specifies the content of the tag applied.

![Data Model](data_model/data_model.svg){width=400px}

## Datasets 
OLI doesn't store any datasets, these will remain with independent data teams. The goal is to align on a data structure for labels.  This will simplify syncing datasets across the ecosystem, avoiding the need to start from scratch. OLI recommends following the approach used by growthepie and walletlabels, and to commit on making their data publicly available through API endpoints to support democratized access to labels.

## Example Datasets
Datasets can be stored like in the Data Model defined or the tag_id can be melted into columns, which is especially usefull for when not all tag_ids are relevant to be stored. 

We have uploaded some OLI compliant sample data for [OP Mainnet (eip155-10)](sample_data/op-mainnet_top_100_contracts_by_txcount_2024_07_24.json) and [Base (eip155-8453)](sample_data/base_top_100_contracts_by_txcount_2024_07_24.json).

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
    }
]
```

## OLI-Compliant Tools
- [growthepie - L2 Smart Contract Explorer](https://labels.growthepie.xyz/)
- ...
- *please list your projects here*

## Roadmap

- [x] Alignment on data framework and getting definitions out
- [ ] Set up a council to manage OLI GitHub and the process of adding new `tag_id`/ other changes
- [ ] Create a way for permissionless data entry by anyone

## Contributors
- [growthepie](https://www.growthepie.xyz/): Layer 2 analytics platform with focus on labeling smart contracts on layer 2s.

![growthepie logo](https://i.ibb.co/54W8j8K/Group-165.png)

- [walletlabels](https://www.walletlabels.xyz/): Wallet labeling platform with focus on labels for Ethereum as well as social labels / labeling of EOAs.

![Walletlabels logo](https://i.ibb.co/DMkw90y/Wallet-Labels-logo.png)

### Sponsors

The [Ethereum Foundation](https://ethereum.foundation/) funded this effort as part of the [Data Collection Grants](https://esp.ethereum.foundation/data-collection-grants). This standardized data structure was part of their [wish list](https://notes.ethereum.org/@drigolvc/DataCollectionWishlist) and other foundations and data teams also expressed interest in the past.

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
