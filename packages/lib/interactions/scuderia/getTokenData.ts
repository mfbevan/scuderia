import { BigNumber, Signer } from "ethers";
import { ScuderiaContract } from "../../../contracts/deployments";
import { decodeBase64 } from "../../helpers"

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
 * Get Scuderia NFT metadata
 */
export const getTokenData = async ({ signer, tokenId }: IMint) => {
  const token = await ScuderiaContract(signer).tokenURI(tokenId);
  return decodeBase64(token);
};
