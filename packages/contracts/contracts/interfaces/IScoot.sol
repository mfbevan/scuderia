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
  function burnToken(uint256 _amount) external;

  /**
   * @notice Claims the pending unclaimed token to the callers wallet
   */
  function claimToken() external;

  /**
   * @notice Get the current wallet balance of an account
   * @param _account the account to check the balance for
   */
  function getBalance(address _account) external view;

  /**
   * @notice Get the unclaimed/claimable balance of an account
   * @param _account the account to check the unclaimed balance for
   */
  function getUnclaimedBalance(address _account) external view;
}