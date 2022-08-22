import { BigNumber, Signer } from "ethers";
import { ScuderiaContract } from "@scuderia/contracts/deployments";

interface IMint {
  /**
   * Wallet to sign transaction
   */
  signer: Signer;
  /**
   * Wallet address to get token ids for
   */
  address: string;
}

/**
 * Get all token ids in a wallet
 */
export const walletOf = async ({ signer, address }: IMint) => {
  const tokens = await ScuderiaContract(signer).walletOf(address);
  return tokens.map((_tkn: BigNumber) => _tkn.toNumber());
};
