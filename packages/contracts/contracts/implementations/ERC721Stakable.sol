// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "../interfaces/IStakable.sol";
import "erc721a/contracts/ERC721A.sol";
import "hardhat/console.sol";

contract ERC721Stakable is IStakable, ERC721A {
    // Token Id => Token Staking Status
    mapping(uint256 => StakedToken) public stakes;

    constructor(string memory _name, string memory _symbol)
        ERC721A(_name, _symbol)
    {}

    function stake(uint256[] memory _tokens, LockinPeriod _lockin) external {
        uint64 lockinSeconds = getLockinSeconds(_lockin);
        for (uint256 i = 0; i < _tokens.length; i++) {
            if (ownerOf(_tokens[i]) != msg.sender) revert NotTokenOwner();
            if (stakes[_tokens[i]].timeStaked != 0)
                revert TokenAlreadyStaked(_tokens[i]);
            stakes[_tokens[i]] = StakedToken(
                uint64(block.timestamp),
                lockinSeconds
            );
        }
        emit Stake(msg.sender, _tokens, lockinSeconds);
    }

    function unstake(uint256[] memory _tokens) external {
        for (uint256 i = 0; i < _tokens.length; i++) {
            StakedToken memory _stakedToken = stakes[_tokens[i]];
            if (ownerOf(_tokens[i]) != msg.sender) revert NotTokenOwner();
            if (_stakedToken.timeStaked == 0) revert TokenNotStaked(_tokens[i]);
            if (
                _stakedToken.timeStaked + _stakedToken.lockinPeriod >
                block.timestamp
            ) revert TokenInLockin(_tokens[i]);
            delete stakes[_tokens[i]];
        }
        emit Unstake(msg.sender, _tokens);
    }

    function burn(uint256 _tokenId) external {
        if (stakes[_tokenId].timeStaked != 0)
            revert CannotTransferStaked(_tokenId);
        _burn(_tokenId, true);
    }

    /**
     * Prevent transfers while a token is staked.
     * Will allow if transfer is from the zero address as this is a mint transaction
     */
    function _beforeTokenTransfers(
        address from,
        address,
        uint256 startTokenId,
        uint256 quantity
    ) internal view override {
        if (from == address(0)) return;
        for (uint256 i = 0; i < quantity; i++) {
            if (stakes[startTokenId + i].timeStaked != 0)
                revert CannotTransferStaked(startTokenId + i);
        }
    }

    /**
     * @notice Return the expected length (in seconds) of the lockin period for the lockin period enum option
     */
    function getLockinSeconds(LockinPeriod _lockin)
        internal
        pure
        returns (uint64 lockinSeconds)
    {
        if (_lockin == LockinPeriod.STAKE_30_DAYS) lockinSeconds = 30 days;
        if (_lockin == LockinPeriod.STAKE_60_DAYS) lockinSeconds = 60 days;
        if (_lockin == LockinPeriod.STAKE_90_DAYS) lockinSeconds = 90 days;
    }
}
