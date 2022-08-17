import { IScuderiaNFT } from "../types";

interface IParsedJSON {
  
}

/**
 * Decode token URI into Scuderia NFT metadata
 * @param tokenURI Base64 encoded tokenURI containing token metadata
 * @returns typed and formatted NFT metadata
 */
export const decodeBase64 = (tokenURI: string) => {
  const base64Code = tokenURI.split(",")[1];
  const buffer = Buffer.from(base64Code, 'base64')

  const obj = JSON.parse(buffer.toString());

  return obj
}
