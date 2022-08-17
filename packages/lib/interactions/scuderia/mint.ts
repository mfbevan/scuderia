import { Signer } from "ethers";
import { ScuderiaContract } from "../../../contracts/deployments";

interface IMint {
  /**
   * Wallet to sign transaction and mint NFTs to
   */
  signer: Signer;
  /**
   * Number of NFTs to mint
   */
  quantity: number;
}

/**
 * Mint quantity of Scuderia NFTs to signer wallet
 */
export const mint = async ({ signer, quantity }: IMint) => {
  const tx = await ScuderiaContract(signer).mint(quantity);
  await tx.wait();
};
