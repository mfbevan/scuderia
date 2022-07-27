import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { ethers } = hre;

    const [deployer] = await ethers.getSigners();

    const ScuderiaContractFactory = await ethers.getContractFactory(
        "Scuderia",
        deployer
    );
    await ScuderiaContractFactory.deploy(deployer.address);
};
export default func;
func.tags = ["testbed", "_scuderia"];
