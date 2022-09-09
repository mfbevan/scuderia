import { ethers, deployments } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, constants } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { Scoot, Scuderia } from "typechain";
import { time } from "@nomicfoundation/hardhat-network-helpers";

use(chaiAsPromised);

const { deploy } = deployments;
const MINT_PRICE = parseEther("0.1");

describe.only("Scuderia Racing ERC20 Scoot SCT", () => {
  let deployer: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress;
  let Scuderia: Scuderia;
  let Scoot: Scoot;

  beforeEach(async () => {
    [deployer, bob, alice] = await ethers.getSigners();

    await deployments.fixture("_scuderia");
    Scuderia = await ethers.getContract("Scuderia");
    Scoot = await ethers.getContract("Scoot");

    await Scuderia.toggleSale();
    await Scuderia.connect(alice).mint(1, { value: MINT_PRICE });

    await Scoot.grantRole(await Scoot.GRANTER_ROLE(), deployer.address);
    await Scoot.grantRole(await Scoot.BURNER_ROLE(), deployer.address);
  });

  describe("grantToken", () => {
    const AMOUNT = parseEther("100");
    it("should grant tokens to recipient", async () => {
      await expect(
        Scoot.grantToken(alice.address, AMOUNT)
      ).to.changeTokenBalance(Scoot, alice.address, AMOUNT);
    });
    it("should revert if caller does not have GRANTER_ROLE", async () => {
      await expect(
        Scoot.connect(bob).grantToken(alice.address, AMOUNT)
      ).to.revertedWithCustomError(Scoot, "InvalidRoleForAction");
    });
  });

  describe("burnToken", () => {
    const AMOUNT = parseEther("100");
    it("should burn tokens of recipient", async () => {
      await Scoot.grantToken(alice.address, AMOUNT);
      await expect(
        Scoot.burnToken(alice.address, AMOUNT)
      ).to.changeTokenBalance(Scoot, alice.address, parseEther("-100"));
    });
    it("should revert if burn balance exceed current balance", async () => {
      await expect(Scoot.burnToken(alice.address, AMOUNT)).to.be.revertedWith(
        "ERC20: burn amount exceeds balance"
      );
    });
    it("should revert if caller does not have BURNER_ROLE", async () => {
      await expect(
        Scoot.connect(bob).burnToken(alice.address, AMOUNT)
      ).to.be.revertedWithCustomError(Scoot, "InvalidRoleForAction");
    });
  });

  describe("claimToken", () => {
    it("should mint pending reward to caller", async () => {
      // ...
    });
    it("should revert if claiming zero reward", async () => {
      // ...
    });
  });

  describe("unclaimedBalanceOf", () => {
    it("should return zero if no balance owed", async () => {
      expect(await Scoot.unclaimedBalanceOf(bob.address)).to.eq(0);
    });
    it("should return unclaimed balance for 1 day", async () => {
      const reward = parseInt(formatEther(await Scoot.DAILY_REWARD()));
      const initial = await Scoot.unclaimedBalanceOf(alice.address);
      expect(parseFloat(formatEther(initial))).to.be.closeTo(0, 3);

      await time.increase(86400);

      const unclaimed = await Scoot.unclaimedBalanceOf(alice.address);
      expect(parseInt(formatEther(unclaimed))).to.be.closeTo(reward, 3);
    });
    it("should return unclaimed balance for 5 day", async () => {
      const reward = 5 * parseInt(formatEther(await Scoot.DAILY_REWARD()));
      const initial = await Scoot.unclaimedBalanceOf(alice.address);
      expect(parseFloat(formatEther(initial))).to.be.closeTo(0, 3);

      await time.increase(86400 * 5);

      const unclaimed = await Scoot.unclaimedBalanceOf(alice.address);
      expect(parseFloat(formatEther(unclaimed))).to.be.closeTo(reward, 3);
    });
  });
});
