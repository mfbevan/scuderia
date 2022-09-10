import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Scuderia } from "typechain";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (hre.network.name !== "hardhat") {
    return;
  }
  const { ethers } = hre;

  const [deployer] = await ethers.getSigners();
  const Scuderia = await ethers.getContract("Scuderia") as Scuderia;

  await Scuderia.connect(deployer).toggleSale();
};
export default func;
func.tags = ["testbed"];
