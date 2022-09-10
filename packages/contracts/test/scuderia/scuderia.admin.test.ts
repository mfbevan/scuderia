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

const OWNABLE_ERROR = "Ownable: caller is not the owner";

describe("Scuderia Racing ERC721 Admin Actions", () => {
  let deployer: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress;
  let Scuderia: Scuderia;

  beforeEach(async () => {
    [deployer, bob, alice] = await ethers.getSigners();

    await deployments.fixture("_scuderia");
    Scuderia = await ethers.getContract("Scuderia");
  });

  describe("toggleSale", () => {
    it("should toggle the sale active flag", async () => {
      expect(await Scuderia.saleActive()).to.be.false;
      await Scuderia.connect(deployer).toggleSale();
      expect(await Scuderia.saleActive()).to.be.true;
    });
    it("should revert if not contract owner", async () => {
      await expect(Scuderia.connect(alice).toggleSale()).to.be.revertedWith(
        OWNABLE_ERROR
      );
    });
  });
  describe("withdraw", () => {
    it("should withdraw funds to recipient account", async () => {
      await Scuderia.toggleSale();
      await Scuderia.mint(1, { value: MINT_PRICE });

      const initialBob = await bob.getBalance();
      await Scuderia.connect(deployer).withdraw(bob.address);
      expect(await bob.getBalance()).to.eq(initialBob.add(MINT_PRICE));
    });
    it("should revert if not contract owner", async () => {
      await expect(
        Scuderia.connect(alice).withdraw(bob.address)
      ).to.be.revertedWith(OWNABLE_ERROR);
    });
  });
  describe("setPrice", () => {
    it("should set the new mint price", async () => {
      const initial = await Scuderia.MINT_PRICE();
      expect(initial).to.eq(MINT_PRICE);

      await Scuderia.setPrice(0);

      const final = await Scuderia.MINT_PRICE();

      expect(final).to.not.eq(initial);
      expect(final).to.eq(BigNumber.from(0));
    });
    it("should revert if not contract owner", async () => {
      await expect(
        Scuderia.connect(alice).setPrice(parseEther("100"))
      ).to.be.revertedWith(OWNABLE_ERROR);
    });
  });
});
