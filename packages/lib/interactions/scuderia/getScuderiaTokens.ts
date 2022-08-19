import { Signer } from "ethers";
import { ScuderiaContract } from "@scuderia/contracts/deployments";
import { decodeBase64 } from "../../helpers";
import { walletOf, getTokenData } from "./";

interface IGetScuderiaTokens {
  /**
   * Wallet to sign transaction
   */
  signer: Signer;
}

/**
 * Get all Scuderia tokens and their data for the signer wallet
 */
export const getScuderiaTokens = async ({ signer }: IGetScuderiaTokens) => {
  try {
    const tokenIds = await walletOf({
      signer,
      address: await signer.getAddress(),
    });
    return await Promise.all(
      tokenIds.map(async (tokenId: number) => getTokenData({ signer, tokenId }))
    );
  } catch (err: any) {
    console.error(err);
  }
  return [];
};
