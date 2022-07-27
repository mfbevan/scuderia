import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers } = hre;

  const [deployer] = await ethers.getSigners();

  const ScootContractFactory = await ethers.getContractFactory(
    "Scoot",
    deployer
  );
  await ScootContractFactory.deploy(parseEther("1000000000"), []);
};
export default func;
func.tags = ["testbed", "_scoot"];
