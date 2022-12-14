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

describe("Scuderia Racing ERC721 Minting", () => {
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
      ).to.be.revertedWith("owner address cannot be 0x0");
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

  describe("Genesis Minting", () => {
    beforeEach(async () => {
      await Scuderia.toggleSale();
    });

    it("should revert if sale is not active", async () => {
      await Scuderia.toggleSale(); // toggle sale to off
      await expect(Scuderia.mint(1)).to.be.revertedWithCustomError(
        Scuderia,
        "SaleInactive"
      );
    });
    it("should revert if supply will be exceeded", async () => {
      await expect(
        Scuderia.connect(alice).mint(5001)
      ).to.be.revertedWithCustomError(Scuderia, "SupplyWillBeExceeded");
    });
    it("should revert on a zero quantity", async () => {
      await expect(Scuderia.mint(0)).to.be.revertedWithCustomError(
        Scuderia,
        "InvalidMintQuantity"
      );
    });
    it("should revert on a greater than max mint quantity", async () => {
      await expect(
        Scuderia.mint(11, { value: MINT_PRICE.mul(11) })
      ).to.be.revertedWithCustomError(Scuderia, "InvalidMintQuantity");
    });
    it("should cost 0.1 ETH", async () => {
      const initialBalance = await alice.getBalance();
      const tx = await Scuderia.connect(alice).mint(1, { value: MINT_PRICE });
      const receipt = await tx.wait();
      const gasUsed = BigNumber.from(receipt.cumulativeGasUsed).mul(
        BigNumber.from(receipt.effectiveGasPrice)
      );
      expect(initialBalance.sub(await alice.getBalance()).sub(gasUsed)).to.eq(
        MINT_PRICE
      );
    });
    it("should randomise metadata on mint", async () => {
      await Scuderia.connect(alice).mint(1, { value: MINT_PRICE });
      expect(await Scuderia.metadataSeed(1)).to.be.properHex(64);
    });

    describe("multiple NFTs", () => {
      const numToMint = 2;
      const mintCost = MINT_PRICE.mul(numToMint);

      it(`should cost ${0.1 * numToMint} ETH`, async () => {
        const initialBalance = await alice.getBalance();
        const tx = await Scuderia.connect(alice).mint(numToMint, {
          value: mintCost,
        });
        const receipt = await tx.wait();
        const gasUsed = BigNumber.from(receipt.cumulativeGasUsed).mul(
          BigNumber.from(receipt.effectiveGasPrice)
        );
        expect(initialBalance.sub(await alice.getBalance()).sub(gasUsed)).to.eq(
          mintCost
        );
      });
      it("should revert when no payment made", async () => {
        await expect(
          Scuderia.connect(bob).mint(numToMint)
        ).to.be.revertedWithCustomError(Scuderia, "IncorrectPaymentAmount");
      });
      it("should revert when incorrect payment made", async () => {
        await expect(
          Scuderia.connect(bob).mint(numToMint, { value: parseEther("1000") })
        ).to.be.revertedWithCustomError(Scuderia, "IncorrectPaymentAmount");
      });
      it("should increase total supply", async () => {
        expect(await Scuderia.totalSupply()).to.eq(0);
        await Scuderia.connect(alice).mint(numToMint, { value: mintCost });
        expect(await Scuderia.totalSupply()).to.eq(numToMint);
      });
      it("should randomise different metadata for each mint", async () => {
        await Scuderia.connect(alice).mint(2, { value: MINT_PRICE.mul(2) });
        const mintA = await Scuderia.metadataSeed(1);
        const mintB = await Scuderia.metadataSeed(2);
        expect(mintA).to.be.properHex(64);
        expect(mintB).to.be.properHex(64);
        expect(mintA).to.not.eql(mintB);
      });
    });

    describe("walletOf", () => {
      it("should return the token id of tokens owned by the wallet", async () => {
        await Scuderia.connect(alice).mint(2, { value: MINT_PRICE.mul(2) });
        await Scuderia.connect(bob).mint(1, { value: MINT_PRICE });
        expect(await Scuderia.connect(alice).walletOf(alice.address)).to.eql([
          BigNumber.from(1),
          BigNumber.from(2),
        ]);
      });
      it("should return empty array if the wallet has no tokens", async () => {
        expect(await Scuderia.connect(alice).walletOf(bob.address)).to.eql([]);
      });
    });
  });
});
