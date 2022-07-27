import { ethers, deployments } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, constants } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { Scuderia } from "typechain/contracts/implementations";

use(chaiAsPromised);

const { deploy } = deployments;
const MINT_PRICE = parseEther("0.1");

describe.only("Scuderia Racing ERC721 Contract", () => {
  let deployer: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress;
  let Scuderia: Scuderia;

  beforeEach(async () => {
    [deployer, bob, alice] = await ethers.getSigners();

    await deployments.fixture("_scuderia");
    Scuderia = await ethers.getContract("Scuderia");
  });

  describe("Initialize Scuderia Contract", async () => {
    it("should not initialize with zero addresses", async () => {
      await expect(
        deploy("ScuderiaTest", {
          from: deployer.address,
          log: false,
          contract: "Scuderia",
          args: [constants.AddressZero],
        })
      ).to.be.revertedWith("Ownable: new owner is the zero address");
    });
    it("should transfer ownership if owner address is different to deployer", async () => {
      await deploy("ScuderiaTest", {
        from: deployer.address,
        log: false,
        contract: "Scuderia",
        args: [alice.address],
      });
      Scuderia = await ethers.getContract("ScuderiaTest");
      expect(await Scuderia.owner()).to.eq(alice.address);
    });
    it("should initialize with sale inactive", async () => {
      expect(await Scuderia.saleActive()).to.eq(false);
    });
  });

  describe("Minting", () => {
    it("should revert if sale is not active", async () => {
      await expect(Scuderia.mint(1)).to.be.revertedWith(
        "land minting inactive"
      );
    });
    it("should revert if supply will be exceeded", async () => {
      await Scuderia.toggleSale();
      await expect(Scuderia.connect(alice).mint(501)).to.be.revertedWith(
        "supply will be exceeded"
      );
    });
    it("should revert on a zero quantity", async () => {
      await Scuderia.toggleSale();
      await expect(Scuderia.mint(0)).to.be.revertedWith(
        "minting zero quantity"
      );
    });

    // Alice should have enough funds to complete actions
    // Bob does not have the funds
    describe("multiple Land NFTs", () => {
      const numToMint = 2;
      const mintCost = MINT_PRICE.mul(numToMint);

      beforeEach(async () => {
        await Scuderia.toggleSale();
      });

      it(`should cost ${0.1 * numToMint} ETH`, async () => {
        await Scuderia.connect(alice).mint(numToMint);
      });
      it("should revert when account does not have sufficient funds", async () => {
        await expect(Scuderia.connect(bob).mint(numToMint)).to.be.revertedWith(
          "ERC20: burn amount exceeds balance"
        );
      });
      it("should revert when maximum mint exceeded", async () => {
        await expect(Scuderia.connect(bob).mint(501)).to.be.revertedWith(
          "maximum mint exceeded"
        );
      });
      it("should increase total supply", async () => {
        expect(await Scuderia.totalSupply()).to.eq(0);
        await Scuderia.connect(alice).mint(numToMint);
        expect(await Scuderia.totalSupply()).to.eq(numToMint);
      });
    });
  });
});
