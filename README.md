# Solidity Playground

This repo contains my personal development in Solidity contracts, where I plan to implement and test a wide variety of Ethereum Smart Contracts.

## Contracts

### NFT Token

The contracts `NFTToken.sol` and interface `INFTToken.sol` implement the ERC721A contract standard to allow multiple mints per transaction as well as a Merkle Tree backed whitelisting method. 

For whitelisting, admins (the contract owner) can determine the Merkle Tree of all whitelisted addresses of chain, and set the new Merkle Root on chain using the `setMerkleRoot` function. When the `whitelistMint` function is called, the users address will be checked against a Merkle Proof (calculated off-chain and provided as a parameter) and their leaf node (on chain), only allowed to mint if the verification passes. Whilst this method slightly increases off-chain overhead, the implementation is a gas efficient and secure method for whitelisting, where the entire list of whitelisted addresses and their associated Merkle Tree can be made public, but an invalid address will never be able to mint. See [this](https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9) article for inspiration.