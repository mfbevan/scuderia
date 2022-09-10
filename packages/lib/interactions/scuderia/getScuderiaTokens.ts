import { BigNumber, Signer } from "ethers";
import { ScuderiaContract } from "@scuderia/contracts/deployments";
import { decodeBase64 } from "../../helpers";
import { walletOf, getTokenData } from "./";

interface IGetScuderiaTokens {
  /**
   * Wallet to sign transaction
   */
  signer?: Signer;
}

/**
 * Get all Scuderia tokens and their data for the signer wallet
 */
export const getScuderiaTokens = async ({ signer }: IGetScuderiaTokens) => {
  if (!signer) return [];
  try {
    const tokenIds = await walletOf({
      signer,
      address: await signer.getAddress(),
    });
    const stakeData = await ScuderiaContract(signer).getStakeStatus(tokenIds);

    const tokenData = await Promise.all(
      tokenIds.map(async (tokenId: number, index) => ({
        ...(await getTokenData({ signer, tokenId })),
        stakeStatus: {
          lockinPeriod: (stakeData[index].lockinPeriod as BigNumber).toNumber(),
          timeStaked: (stakeData[index].timeStaked as BigNumber).toNumber(),
          staked: (stakeData[index].timeStaked as BigNumber).toNumber() !== 0,
        },
      }))
    );

    return tokenData;
  } catch (err: any) {
    console.error(err);
  }
  return [];
};
