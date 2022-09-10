import { Signer } from "ethers";
import { ScootContract } from "@scuderia/contracts/deployments";
import { formatEther } from "ethers/lib/utils";

interface IClaim {
  /**
   * Wallet to sign transaction
   */
  signer?: Signer;
}

/**
 * Get Scoot Token balance
 */
export const claimToken = async ({ signer }: IClaim) => {
  if (!signer) return 0;
  try {
    console.log("claiming")
    const tx = await ScootContract(signer).claimToken();
    await tx.wait();
  } catch (err: any) {
    console.error(err);
  }
  return 0;
};
