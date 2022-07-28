// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "../interfaces/IStakable.sol";
import "erc721a/contracts/ERC721A.sol";

contract ERC721Stakable is IStakable, ERC721A {
    // Token Id => Token Staking Status
    mapping(uint256 => StakedToken) public stakes;

    constructor(string memory _name, string memory _symbol)
        ERC721A(_name, _symbol)
    {}

    function stake(uint256[] memory _tokens) external {
        for (uint256 i = 0; i < _tokens.length; i++) {
            if (ownerOf(_tokens[i]) != msg.sender) revert NotTokenOwner();
            if (stakes[_tokens[i]].timeStaked != 0)
                revert TokenAlreadyStaked(_tokens[i]);
            stakes[_tokens[i]] = StakedToken(uint64(block.timestamp), 30 days);
        }
        emit Stake(msg.sender, _tokens, 30 days);
    }

    function unstake(uint256[] memory _tokens) external {
        // ...
    }
}
