import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { config } from "../../lib/config";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("NFTToken", {
    from: deployer,
    log: true,
    contract: "NFTToken",
    args: [
      deployer,
      config.maxSupply,
      ethers.utils.parseEther(`${config.mintPrice}`)
    ],
  });
};
export default func;
func.tags = ["testbed", "_nfttoken"];