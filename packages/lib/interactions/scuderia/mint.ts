import { Signer } from "ethers";
import { ScuderiaContract } from "../../../contracts/deployments";

interface IMint {
  signer: Signer;
  quantity: number;
}

/**
 * Mint @param quantity of Scuderia NFTs to @param signer wallet
 */
export const mint = async ({ signer, quantity }: IMint) => {
  const tx = await ScuderiaContract(signer).mint(quantity);
  await tx.wait();
};
