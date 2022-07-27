// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

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
}