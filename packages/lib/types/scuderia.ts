export interface Stake {
  /**
   * Is this token staked
   */
  staked: boolean;
  /**
   * UTC time when initial stake was made
   */
  timeStaked: number;
  /**
   * Lockin period before stake can be released
   */
  lockinPeriod: number;
}

export interface IScuderiaNFT {
  /**
   * ID of the token
   */
  tokenId: number;
  /**
   * Name of the token
   */
  name: string;
  /**
   * Generic token description
   */
  description: string;
  /**
   * SVG image decoded from on-chain library (encoded in SVG Base64)
   */
  image: string;
  /**
   * The speed of the vehicle (for racing)
   */
  speed: number;
  /**
   * The acceleration of the vehicle (for racing)
   */
  acceleration: number;
  /**
   * The handling of the vehicle (for racing)
   */
  handling: number;
  /**
   * The reliability of the vehicle (for racing)
   */
  reliability: number;
  /**
   * The staking status of the token
   */
  stakeStatus?: Stake;
  /**
   * Opensea attributes
   */
  attributes: { trait_type: string; value: string }[];
}
