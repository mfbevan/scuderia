import { Signer } from "ethers";
import { ScuderiaContract } from "@scuderia/contracts/deployments";
import { IScuderiaNFT } from "../../types";
import { StakingLockinOption } from "../../constants";

interface IStakeScuderia {
  /**
   * Wallet to sign transaction
   */
  signer?: Signer;
  /**
   * Tokens to stake
   */
  tokens: IScuderiaNFT[];
  /**
   * The staking period to stake tokens for
   */
  stakingPeriod: StakingLockinOption;
}

/**
 * Stake Scuderia tokens
 */
export const stake = async ({
  signer,
  tokens,
  stakingPeriod,
}: IStakeScuderia) => {
  const ids = tokens.map((_tkn) => _tkn.tokenId);
  const stake = await ScuderiaContract(signer).stake(ids, stakingPeriod);
  await stake.wait();
};
