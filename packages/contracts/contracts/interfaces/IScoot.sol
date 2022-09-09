// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

interface IScoot {
    /**
     * @notice Grants amount of token to recipient
     * @dev This is a function reserved for owners and approved contracts
     */
    function grantToken(address _recipient, uint256 _amount) external;

    /**
     * @notice Burns an amount of token owned by the user
     * @param _amount Quantity of SCT to burn
     */
    function burnToken(address _recipient, uint256 _amount) external;

    /**
     * @notice Claims the pending unclaimed token to the callers wallet
     */
    function claimToken() external;

    /**
     * @notice Update the currently stored award amount after transfer
     * @dev Note this does not claim the balance, it just updates the unclaimed reward amount
     */
    function updateReward(address _sender, address _receiver) external;

    /**
     * @notice Get the unclaimed/claimable balance of an account
     * @param _account the account to check the unclaimed balance for
     */
    function unclaimedBalanceOf(address _account)
        external
        view
        returns (uint256);

    /**
     * @notice Does not have the correct permissions to execute this function
     */
    error InvalidRoleForAction();

    /**
     * @notice Attempting to claim a zero balance reward
     */
    error ClaimingZeroReward();
}
