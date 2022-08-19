import {  Signer } from "ethers";
import { ScuderiaContract } from "@scuderia/contracts/deployments";
import { decodeBase64 } from "../../helpers"

interface IGetTokenData {
  /**
   * Wallet to sign transaction
   */
  signer: Signer;
  /**
   * Id of token to get metadata for
   */
  tokenId: number;
}

/**
 * Get Scuderia NFT metadata
 */
export const getTokenData = async ({ signer, tokenId }: IGetTokenData) => {
  const token = await ScuderiaContract(signer).tokenURI(tokenId);
  return decodeBase64(token);
};
