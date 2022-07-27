// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IScuderia {
  /**
   * @notice Genesis Mint - Mint quantity of nfts to sender
   * @param _quantity number of nfts to mint
   */
  function mint(uint256 _quantity) external payable;

  /**
   * @notice Create a second generation racing NFT using a genesis token as a blueprint. Cost $SCOOT token
   * @param _blueprintId the tokenId of the vehicle to use as a blueprint to create a second generation token
   */
  function secondaryMint(uint256 _blueprintId) external;

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
}