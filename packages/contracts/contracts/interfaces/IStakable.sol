// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IStakable {
    struct StakedToken {
        uint64 timeStaked;
        uint64 lockinPeriod;
    }

    /**
     * @notice Emits when a user stakes their NFT tokens
     * @param _owner The owner of the tokens
     * @param _tokens The token ids being staked
     * @param _lockinPeriod The lockin period for the staked tokens
     */
    event Stake(
        address indexed _owner,
        uint256[] _tokens,
        uint256 _lockinPeriod
    );

    /**
     * @notice Emits when a user unstakes their NFT tokens
     * @param _owner The owner of the tokens
     * @param _tokens The token ids being unstaked
     */
    event Unstake(address indexed _owner, uint256[] _tokens);

    /**
     * @notice Stake Scuderia tokens in current users wallet, making them unable to withdraw but enabling more functionality
     * @param _tokens array of token ids to stake
     */
    function stake(uint256[] memory _tokens) external;

    /**
     * @notice Unstake the tokens locked in a users wallet, making them available for transfer
     * @param _tokens array of token ids to unstake
     */
    function unstake(uint256[] memory _tokens) external;
    
    /**
     * @notice The caller is not the owner of the token
     */
    error NotTokenOwner();

    /**
     * @notice Token is already staked
     */
    error TokenAlreadyStaked(uint256 _tokenId);
}
