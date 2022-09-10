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
 * Get Scoot Token unclaimed balance
 */
export const getUnclaimedBalance = async ({ signer }: IGetBalance) => {
  if (!signer) return 0;
  try {
    const address = await signer.getAddress();
    const balance = await ScootContract(signer).unclaimedBalanceOf(address);
    return parseFloat(formatEther(balance));
  } catch (err: any) {
    console.error(err);
  }
  return 0;
};
