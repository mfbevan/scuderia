import { ethers, deployments } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";
import { Scuderia } from "typechain/contracts/implementations";
import { decodeBase64 } from "@scuderia/lib";

use(chaiAsPromised);

const MINT_PRICE = parseEther("0.1");
const name = "Scuderia NFT";
const description =
  "Scuderia is a fully on-chain racing NFT ecosystem that allows minting, metadata and image generation, racing and betting, all running on Polygon.";

describe("Scuderia Racing ERC721 Metadata Generation", () => {
  let deployer: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress;
  let Scuderia: Scuderia;

  beforeEach(async () => {
    [deployer, bob, alice] = await ethers.getSigners();

    await deployments.fixture("_scuderia");
    Scuderia = await ethers.getContract("Scuderia");

    await Scuderia.toggleSale();
    await Scuderia.connect(alice).mint(1, { value: MINT_PRICE });
  });

  describe("Build Metadata", () => {
    it("should return the token metadata", async () => {
      const uri = await Scuderia.tokenURI(1);
      const metadata = decodeBase64(uri);
      expect(metadata.name).to.eq(name);
      expect(metadata.description).to.eq(description);
      expect(metadata.tokenId).to.eq(1);
      expect(metadata.image.startsWith("data:image/svg+xml;base64")).to.be.true;
      expect(metadata.speed).to.be.greaterThan(30);
      expect(metadata.acceleration).to.be.greaterThan(30);
      expect(metadata.handling).to.be.greaterThan(30);
      expect(metadata.reliability).to.be.greaterThan(30);
    });
    it("should revert if the token does not exist", async () => {
      await expect(Scuderia.tokenURI(2)).to.be.revertedWithCustomError(
        Scuderia,
        "URIQueryForNonexistentToken"
      );
    });
  });
});
