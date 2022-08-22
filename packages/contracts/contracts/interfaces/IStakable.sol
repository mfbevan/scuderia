// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

interface IStakable {
    struct StakedToken {
        uint64 timeStaked;
        uint64 lockinPeriod;
    }

    /**
     * The lockin period for staking in which an nft is staked and cannot be unstaked
     */
    enum LockinPeriod {
        STAKE_30_DAYS,
        STAKE_60_DAYS,
        STAKE_90_DAYS
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
     * @param _lockin Lockin period in seconds
     */
    function stake(uint256[] memory _tokens, LockinPeriod _lockin) external;

    /**
     * @notice Unstake the tokens locked in a users wallet, making them available for transfer
     * @param _tokens array of token ids to unstake
     */
    function unstake(uint256[] memory _tokens) external;

    /**
     * @notice Burn a token to the zero address
     * @dev This transaction will revert if the token is currently staked
     * @param _tokenId the token to burn
     */
    function burn(uint256 _tokenId) external;

    /**
     * @notice The caller is not the owner of the token
     */
    error NotTokenOwner();

    /**
     * @notice Token is already staked but expected to not be staked
     */
    error TokenAlreadyStaked(uint256 _tokenId);

    /**
     * @notice Token is not staked but is expected to be staked
     */
    error TokenNotStaked(uint256 _tokenId);

    /**
     * @notice The Token cannot be unstaked as it in still within its lockin period
     */
    error TokenInLockin(uint256 _tokenId);

    /**
     * Cannot execute action as this token is staked. This will be called if a transfer is made while the token is staked
     */
    error CannotTransferStaked(uint256 _tokenId);
}
