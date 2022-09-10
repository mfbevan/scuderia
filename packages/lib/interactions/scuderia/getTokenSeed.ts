import { Signer } from "ethers";
import { ScuderiaContract } from "@scuderia/contracts/deployments";

interface IGetTokenSeed {
  /**
   * Wallet to sign transaction
   */
  signer?: Signer;
  /**
   * Id of token to get metadata for
   */
  tokenId: number;
}

/**
 * Get Scuderia NFT seed for metadata generation
 */
export const getTokenSeed = async ({ signer, tokenId }: IGetTokenSeed) => {
  return ScuderiaContract(signer).metadataSeed(tokenId);
};
