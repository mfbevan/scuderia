import { ethers, deployments } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, constants } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { Scuderia } from "typechain/contracts/implementations";
import { decodeBase64 } from "@scuderia/lib";

use(chaiAsPromised);

const MINT_PRICE = parseEther("0.1");

describe.only("Scuderia Racing ERC721 SVG Generation", () => {
  let deployer: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress;
  let Scuderia: Scuderia;

  beforeEach(async () => {
    [deployer, bob, alice] = await ethers.getSigners();

    await deployments.fixture("_scuderia");
    Scuderia = await ethers.getContract("Scuderia");
  });

  describe("ScuderiaSVG", () => {
    beforeEach(async () => {
      await Scuderia.toggleSale();
    });

    it("should return an SVG for the token", async () => {
      await Scuderia.connect(alice).mint(1, { value: MINT_PRICE });
      const uri = await Scuderia.tokenURI(1);

      

      console.log(decodeBase64(uri))

    });
    // it("should revert if the token does not exist", async () => {
    //   throw Error("not implemented")
    // });
  });
});
