import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments } = hre;
  const { deploy } = deployments;

  const [deployer] = await ethers.getSigners();

  await deploy("Scoot", {
    from: deployer.address,
    log: true,
    contract: "Scoot",
    args: [parseEther("1000000000"), []],
  });
};
export default func;
func.tags = ["testbed", "_scoot"];
