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
     * @notice flag to enable sale has not yet been made active
     */
    error SaleInactive();

    /**
     * @notice making a function call with a zero quantity
     */
    error ZeroQuantity();

    /**
     * @notice Incorrect payment amount
     */
    error IncorrectPaymentAmount();

    /**
     * @notice The supply will be exceeded if this transaction was completed
     */
    error SupplyWillBeExceeded();
}
