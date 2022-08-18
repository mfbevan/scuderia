import { BigNumber, Signer } from "ethers";
import { ScuderiaContract } from "../../../contracts/deployments";
import { decodeBase64 } from "../../helpers";

interface IMint {
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
 * Get Scuderia NFT seed for metadata generation
 */
export const getTokenSeed = async ({ signer, tokenId }: IMint) => {
  return ScuderiaContract(signer).metadataSeed(tokenId);
};
