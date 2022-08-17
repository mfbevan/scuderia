export interface IScuderiaNFT {
  /**
   * ID of the token
   */
  tokenId: string;
  /**
   * SVG image decoded from on-chain library
   */
  image: string;
  /**
   * Random seed generate on-chain at mint
   */
  seed: string;
}