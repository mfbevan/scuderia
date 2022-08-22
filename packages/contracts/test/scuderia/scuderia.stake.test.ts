import { ethers, deployments, network } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";
import { Scuderia } from "typechain/contracts/implementations";
import { StakingLockin, StakingLockinOption } from "@scuderia/lib/constants";
import { BigNumber } from "ethers";

use(chaiAsPromised);

const MINT_PRICE = parseEther("0.1");

/**
 * Advance evm time by number of @param seconds
 */
const advanceEvmTime = async (seconds: number) =>
  await network.provider.send("evm_increaseTime", [seconds]);

/**
 * Get the timestamp of the current block
 */
const getBlockTimestamp = async () => {
  const blockNumber = await network.provider.send("eth_blockNumber");
  const { timestamp } = await ethers.provider.getBlock(blockNumber);
  return timestamp;
};

describe.only("Scuderia Racing ERC721 Staking", () => {
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

      expect(await Scuderia.stakes(1)).to.eql([
        BigNumber.from(await getBlockTimestamp()),
        BigNumber.from(StakingLockin.STAKE_30_DAYS),
      ]);
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

    it("should prevent safe transfers while staked", async () => {
      await Scuderia.connect(alice).stake(
        [1],
        StakingLockinOption.STAKE_30_DAYS
      );
      await expect(
        Scuderia.connect(alice)["safeTransferFrom(address,address,uint256)"](
          alice.address,
          bob.address,
          1
        )
      ).to.be.revertedWithCustomError(Scuderia, "CannotTransferStaked");
    });
    it("should prevent transfer while staked", async () => {
      await Scuderia.connect(alice).stake(
        [1],
        StakingLockinOption.STAKE_30_DAYS
      );
      await expect(
        Scuderia.connect(alice).transferFrom(alice.address, bob.address, 1)
      ).to.be.revertedWithCustomError(Scuderia, "CannotTransferStaked");
    });
    it("should prevent burning while staked", async () => {
      await Scuderia.connect(alice).stake(
        [1],
        StakingLockinOption.STAKE_30_DAYS
      );
      await expect(
        Scuderia.connect(alice).burn(1)
      ).to.be.revertedWithCustomError(Scuderia, "CannotTransferStaked");
    });
  });

  describe("unstake", () => {
    beforeEach(async () => {
      await Scuderia.toggleSale();
      await Scuderia.connect(alice).mint(2, { value: MINT_PRICE.mul(2) });
      await Scuderia.connect(alice).stake(
        [1, 2],
        StakingLockinOption.STAKE_30_DAYS
      );
    });
    it("should unstake the token", async () => {
      await advanceEvmTime(StakingLockin.STAKE_30_DAYS);
      await expect(Scuderia.connect(alice).unstake([1]))
        .to.emit(Scuderia, "Unstake")
        .withArgs(alice.address, [1]);
    });
    it("should support multiple tokens", async () => {
      await advanceEvmTime(StakingLockin.STAKE_30_DAYS);
      await expect(Scuderia.connect(alice).unstake([1, 2]))
        .to.emit(Scuderia, "Unstake")
        .withArgs(alice.address, [1, 2]);
    });
    it("should revert if within the lockin period", async () => {
      await expect(
        Scuderia.connect(alice).unstake([1])
      ).to.be.revertedWithCustomError(Scuderia, "TokenInLockin");
    });
    it("should revert if not the token owner", async () => {
      await expect(
        Scuderia.connect(bob).unstake([1])
      ).to.be.revertedWithCustomError(Scuderia, "NotTokenOwner");
    });
    it("should revert if one of the tokens are not staked", async () => {
      await Scuderia.connect(alice).mint(1, { value: MINT_PRICE });
      await expect(
        Scuderia.connect(alice).unstake([3])
      ).to.be.revertedWithCustomError(Scuderia, "TokenNotStaked");
    });
    it("should prevent transferring multiple tokens while staked", async () => {
      await expect(
        Scuderia.connect(alice)["safeTransferFrom(address,address,uint256)"](
          alice.address,
          bob.address,
          1
        )
      ).to.be.revertedWithCustomError(Scuderia, "CannotTransferStaked");
    });
  });
});
