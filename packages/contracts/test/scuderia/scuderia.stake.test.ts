import { ethers, deployments } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";
import { Scuderia } from "typechain/contracts/implementations";
import { StakingLockin, StakingLockinOption } from "@scuderia/lib/constants";

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
      await expect(
        Scuderia.connect(alice).stake([1], StakingLockinOption.STAKE_30_DAYS)
      )
        .to.emit(Scuderia, "Stake")
        .withArgs(alice.address, [1], StakingLockin.STAKE_30_DAYS);
    });
    it("should support multiple stakes", async () => {
      await expect(
        Scuderia.connect(alice).stake([1, 2], StakingLockinOption.STAKE_30_DAYS)
      )
        .to.emit(Scuderia, "Stake")
        .withArgs(alice.address, [1, 2], StakingLockin.STAKE_30_DAYS);
    });
    it("should support setting a 30 day lockin period", async () => {
      await expect(
        Scuderia.connect(alice).stake([1, 2], StakingLockinOption.STAKE_30_DAYS)
      )
        .to.emit(Scuderia, "Stake")
        .withArgs(alice.address, [1, 2], StakingLockin.STAKE_30_DAYS);
    });
    it("should support setting a 60 day lockin period", async () => {
      await expect(
        Scuderia.connect(alice).stake([1, 2], StakingLockinOption.STAKE_60_DAYS)
      )
        .to.emit(Scuderia, "Stake")
        .withArgs(alice.address, [1, 2], StakingLockin.STAKE_60_DAYS);
    });
    it("should support setting a 90 day lockin period", async () => {
      await expect(
        Scuderia.connect(alice).stake([1, 2], StakingLockinOption.STAKE_90_DAYS)
      )
        .to.emit(Scuderia, "Stake")
        .withArgs(alice.address, [1, 2], StakingLockin.STAKE_90_DAYS);
    });
    it("should revert on an invalid staking period", async () => {
      const INVALID_STAKE_OPTION = 3;
      await expect(
        Scuderia.connect(alice).stake([1], INVALID_STAKE_OPTION)
      ).to.be.revertedWithoutReason();
    });
    it("should revert if not the token owner", async () => {
      await expect(
        Scuderia.connect(alice).stake([3], StakingLockinOption.STAKE_30_DAYS)
      ).to.be.revertedWithCustomError(Scuderia, "NotTokenOwner");
    });
    it("should revert if the token is already staked", async () => {
      await Scuderia.connect(alice).stake(
        [1],
        StakingLockinOption.STAKE_30_DAYS
      );
      await expect(
        Scuderia.connect(alice).stake([1], StakingLockinOption.STAKE_30_DAYS)
      ).to.be.revertedWithCustomError(Scuderia, "TokenAlreadyStaked");
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
      await Scuderia.connect(alice).stake(
        [1],
        StakingLockinOption.STAKE_30_DAYS
      );
    });
    it("should unstake the token", async () => {
      // emit event and clear the stake data
    })
    it("should support multiple tokens", async () => {})
    it("should revert if within the lockin period", async () => {})
    it("should revert if not the token owner", async () => {})
    it("should revert if one of the tokens are not staked", async () => {})
  });
});
