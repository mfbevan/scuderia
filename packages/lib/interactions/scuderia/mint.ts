import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ScuderiaContract } from "@scuderia/contracts/deployments";

const MINT_PRICE = parseEther("0.1");

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
  const tx = await ScuderiaContract(signer).mint(quantity, {
    value: MINT_PRICE.mul(quantity),
  });
  await tx.wait();
};
