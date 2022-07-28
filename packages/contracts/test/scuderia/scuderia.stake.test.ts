import { ethers, deployments } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";
import { Scuderia } from "typechain/contracts/implementations";
import { StakingLockin } from "@scuderia/lib/constants";

use(chaiAsPromised);

const MINT_PRICE = parseEther("0.1");

describe("Scuderia Racing ERC721 Staking", () => {
  let deployer: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress;
  let Scuderia: Scuderia;

  beforeEach(async () => {
    [deployer, bob, alice] = await ethers.getSigners();

    await deployments.fixture("_scuderia");
    Scuderia = await ethers.getContract("Scuderia");
  });

  describe("stake", () => {
    beforeEach(async () => {
      await Scuderia.toggleSale();
      await Scuderia.connect(alice).mint(2, { value: MINT_PRICE.mul(2) });
      await Scuderia.connect(bob).mint(1, { value: MINT_PRICE });
    });
    it("should stake the token", async () => {
      await expect(Scuderia.connect(alice).stake([1])).to.emit(
        Scuderia,
        "Stake"
      );
    });
    it("should revert if not the token owner", async () => {
      await expect(
        Scuderia.connect(alice).stake([3])
      ).to.be.revertedWithCustomError(Scuderia, "NotTokenOwner");
    });
    it("should revert if the token is already staked", async () => {
      await Scuderia.connect(alice).stake([1]);
      await expect(
        Scuderia.connect(alice).stake([1])
      ).to.be.revertedWithCustomError(Scuderia, "TokenAlreadyStaked");
    });
    it("should support multiple stakes", async () => {
      await expect(Scuderia.connect(alice).stake([1, 2]))
        .to.emit(Scuderia, "Stake")
        .withArgs(alice.address, [1, 2], StakingLockin.STAKE_30_DAYS);
    });
    it("should prevent transfers while staked", async () => {
      // ... need to override before transfer check
    });
    it("should prevent burning while staked", async () => {
      // ...
    });
  });

  describe("unstake", () => {
    beforeEach(async () => {
      await Scuderia.toggleSale();
      await Scuderia.connect(alice).mint(1, { value: MINT_PRICE });
      await Scuderia.connect(alice).stake([1]);
    });
  });
});
