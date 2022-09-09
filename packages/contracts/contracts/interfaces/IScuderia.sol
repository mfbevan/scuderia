// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

interface IScuderia {
    /**
     * @notice Genesis Mint - Mint quantity of nfts to sender
     * @param _quantity number of nfts to mint
     */
    function mint(uint256 _quantity) external payable;

    /**
     * @notice flag to enable sale has not yet been made active
     */
    error SaleInactive();

    /**
     * @notice making a function call with a zero quantity or quantity greater than the max per mint
     */
    error InvalidMintQuantity();

    /**
     * @notice Incorrect payment amount
     */
    error IncorrectPaymentAmount();

    /**
     * @notice The supply will be exceeded if this transaction was completed
     */
    error SupplyWillBeExceeded();
}
