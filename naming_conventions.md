# Naming Convention Guide

**In the effort of maintaining high data integrity and establishing a well-organised system, OLI presents a comprehensive guide to best naming practices here.**

The significance of adopting consistent and logical naming conventions cannot be overstated. By adhering to the guidelines set here, we can all ensure that the data model remains robust and scalable. 

## Address Name

The field `address: name` (*string*) refers to the fundamental descriptor that provides a clear and immediate understanding of an address's purpose or role. It should offer a straightforward one word detailed definition into the functionality of the address.

Example: 

    Uniswap router contract, address: name = 'router' 

## Project Name

The field `project: name` (*string*) encapsulate the broader, bigger picture under which multiple contracts or elements are grouped. It's assigned based on the protocol or identity name associated with two or more contracts.

Example: 

    Uniswap router contract, projects: name = 'Uniswap' 

## Team Name

The field `team: name` (*string*) describes the collective or organisation responsible for the development or maintaining of the project.

Example: 

    Uniswap router contract, team: name = 'Uniswap Labs' 

## Tag names

(coming soon)