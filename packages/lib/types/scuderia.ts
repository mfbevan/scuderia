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
}
