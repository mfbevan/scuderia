import { IScuderiaNFT } from "../types";

/**
 * Decode token URI into Scuderia NFT metadata
 * @param tokenURI Base64 encoded tokenURI containing token metadata
 * @returns typed and formatted NFT metadata
 */
export const decodeBase64 = (tokenURI: string): IScuderiaNFT => {
  const base64Code = tokenURI.split(",")[1];
  const buffer = Buffer.from(base64Code, 'base64')
  
  const { tokenId, ...data} = JSON.parse(buffer.toString());

  return {
    tokenId: parseInt(tokenId),
    ...data
  }
}
