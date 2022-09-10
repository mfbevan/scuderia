import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments } = hre;
  const { deploy } = deployments;

  const [deployer] = await ethers.getSigners();

  const Scuderia = await ethers.getContract("Scuderia");

  const Scoot = await deploy("Scoot", {
    from: deployer.address,
    log: true,
    contract: "Scoot",
    args: [deployer.address, Scuderia.address],
  });

  await Scuderia.setScootContract(Scoot.address);
};
export default func;
func.tags = ["testbed", "_scuderia"];
