import { Signer } from "ethers";
import { ScuderiaContract } from "@scuderia/contracts/deployments";
import { IScuderiaNFT } from "../../types";

interface IUnstakeScuderia {
  /**
   * Wallet to sign transaction
   */
  signer: Signer;
  /**
   * Tokens to unstake
   */
  tokens: IScuderiaNFT[];
}

/**
 * Unstake Scuderia tokens
 */
export const unstake = async ({
  signer,
  tokens,
}: IUnstakeScuderia) => {
  const ids = tokens.map((_tkn) => _tkn.tokenId);
  const stake = await ScuderiaContract(signer).unstake(ids);
  await stake.wait();
};
