import { Signer } from "ethers";
import { ScootContract } from "@scuderia/contracts/deployments";
import { formatEther } from "ethers/lib/utils";

interface IGetBalance {
  /**
   * Wallet to sign transaction
   */
  signer?: Signer;
}

/**
 * Get Scoot Token balance
 */
export const getBalance = async ({ signer }: IGetBalance) => {
  if (!signer) return 0;
  try {
    const balance = await ScootContract(signer).balanceOf(await signer.getAddress());
    return parseFloat(formatEther(balance));
  } catch (err: any) {
    console.error(err);
  }
  return 0;
};
