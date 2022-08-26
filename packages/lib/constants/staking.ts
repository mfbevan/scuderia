/**
 * Number of seconds in the lockin period
 */
export enum StakingLockin {
  STAKE_30_DAYS = 2592000,
  STAKE_60_DAYS = 5184000,
  STAKE_90_DAYS = 7776000,
}

/**
 * The option passed to the staking contract to select the appropriate staking period
 */
export enum StakingLockinOption {
  STAKE_30_DAYS = 0,
  STAKE_60_DAYS = 1,
  STAKE_90_DAYS = 2,
}
