export interface IScuderiaNFT {
  /**
   * ID of the token
   */
  tokenId: string;
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
   * Random seed generate on-chain at mint
   */
  seed: string;
}