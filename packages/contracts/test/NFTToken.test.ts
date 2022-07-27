import { ethers, deployments } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { NFTToken } from "typechain";
import { config } from "../../lib/config";
import { generateMerkleTree } from "../../lib";
import { BigNumber } from "ethers";

use(chaiAsPromised);

const { deploy } = deployments;
const ZERO_ADDRESS = ethers.constants.AddressZero;
const mintPrice = (numToMint?: number) =>
    ethers.utils.parseEther(`${numToMint ?? 1 * config.mintPrice}`);

describe("ERC721 NFT Contract", () => {
    let deployer: SignerWithAddress,
        alice: SignerWithAddress,
        bob: SignerWithAddress,
        charlie: SignerWithAddress;
    let nftContract: NFTToken;

    beforeEach(async () => {
        [deployer, alice, bob, charlie] = await ethers.getSigners();
        await deployments.fixture("_nfttoken");
        nftContract = await ethers.getContract("NFTToken");
    });

    describe("Initialize Staking Contract", async () => {
        it("should not initialize with zero addresses", async () => {
            await expect(
                deploy("NFTToken", {
                    from: deployer.address,
                    log: false,
                    contract: "NFTToken",
                    args: [ZERO_ADDRESS, config.maxSupply, mintPrice()],
                })
            ).to.be.revertedWith("owner address cannot be 0x0");
        });
        it("should transfer ownership if owner is supplied", async () => {
            await deploy("AliceContract", {
                from: deployer.address,
                log: false,
                contract: "NFTToken",
                args: [alice.address, config.maxSupply, mintPrice()],
            });
            const contract = await ethers.getContract("AliceContract");
            expect(await contract.owner()).to.eq(alice.address);
        });
        it("should initialize a max supply", async () => {
            expect(await nftContract.maxSupply()).to.eq(config.maxSupply);
        });
        it("should initialize with a mint price", async () => {
            expect(await nftContract.mintPrice()).to.eq(mintPrice());
        });
        it("should initialize with sale inactive", async () => {
            expect(await nftContract.saleActive()).to.eq(false);
        });
    });

    describe("Minting", () => {
        beforeEach(async () => {
            await nftContract.toggleSale();
        });
        it("should revert if sale is not active", async () => {
            await nftContract.toggleSale(); // turn sale off
            await expect(nftContract.mint(1)).to.be.revertedWith(
                "sale not active"
            );
        });
        it("should revert if supply will be exceeded", async () => {
            const numToMint = config.maxSupply + 1;
            await expect(
                nftContract
                    .connect(alice)
                    .mint(numToMint, { value: mintPrice(numToMint) })
            ).to.be.revertedWith("supply will be exceeded");
        });
        it("should revert on a zero quantity", async () => {
            await expect(nftContract.mint(0)).to.be.revertedWith(
                "minting zero quantity"
            );
        });
        it("should revert if no value paid", async () => {
            await expect(nftContract.mint(1)).to.be.revertedWith(
                "missing or incorrect fee"
            );
        });
        it("should revert if no payment is made", async () => {
            await expect(nftContract.connect(bob).mint(1)).to.be.revertedWith(
                "missing or incorrect fee"
            );
        });

        // User A should have enough funds to complete actions
        // User B does not have the funds
        describe("a single NFT", () => {
            it("happy path", async () => {
                await nftContract
                    .connect(alice)
                    .mint(1, { value: mintPrice() });
                expect(await nftContract.balanceOf(alice.address)).to.eq(1);
            });
            it("should increase total supply", async () => {
                expect(await nftContract.totalSupply()).to.eq(0);
                await nftContract
                    .connect(alice)
                    .mint(1, { value: mintPrice() });
                expect(await nftContract.totalSupply()).to.eq(1);
            });
        });

        describe("multiple NFTs", () => {
            const numToMint = 2;
            const mintCost = numToMint * config.mintPrice;

            it(`happy path - should require ${mintCost} ETH`, async () => {
                await nftContract
                    .connect(alice)
                    .mint(numToMint, { value: mintPrice(numToMint) });
                expect(await nftContract.balanceOf(alice.address)).to.eq(
                    numToMint
                );
            });
            it("should increase total supply", async () => {
                expect(await nftContract.totalSupply()).to.eq(0);
                await nftContract
                    .connect(alice)
                    .mint(numToMint, { value: mintPrice(numToMint) });
                expect(await nftContract.totalSupply()).to.eq(numToMint);
            });
        });
    });

    describe("Whitelist minting", () => {
        // TODO: improve this to have a much large range of addresses
        let merkleRoot: string,
            whitelistProof: string[],
            notWhitelistProof: string[];

        beforeEach(async () => {
            const merkleTree = generateMerkleTree([
                bob.address,
                charlie.address,
            ]);
            merkleRoot = merkleTree.getHexRoot();

            // The hex proof for UserB who is on the whitelist
            whitelistProof = merkleTree.getHexProof(
                ethers.utils.keccak256(bob.address)
            );
            // The hex proof for UserA who is no on the whitelist
            notWhitelistProof = merkleTree.getHexProof(
                ethers.utils.keccak256(alice.address)
            );

            await nftContract.setMerkleRoot(merkleRoot);
            await nftContract.toggleSale();
        });

        it("happy path", async () => {
            // utilizing userB who is on the whitelist
            await nftContract
                .connect(bob)
                .whitelistMint(whitelistProof, { value: mintPrice() });
        });
        it("should revert if sale is not active", async () => {
            await nftContract.toggleSale();
            await expect(
                nftContract.whitelistMint(whitelistProof)
            ).to.be.revertedWith("sale not active");
        });
        it("should revert if supply will be exceeded", async () => {
            // pre-mint all of supply
            await nftContract
                .connect(bob)
                .mint(config.maxSupply, { value: mintPrice(config.maxSupply) });
            await expect(
                nftContract
                    .connect(bob)
                    .whitelistMint(whitelistProof, { value: mintPrice() })
            ).to.be.revertedWith("supply will be exceeded");
        });
        it("should revert if not on the whitelist", async () => {
            // utilizing userA who is not on the whitelist and has an invalid proof
            await expect(
                nftContract
                    .connect(alice)
                    .whitelistMint(notWhitelistProof, { value: mintPrice() })
            ).to.be.revertedWith("invalid proof");
        });
        it("should revert on valid proof for incorrect address", async () => {
            /** a valid proof can be created for a known whitelist address but the leaf node is
             * calculated on chain with the sender address, therefore this test should revert
             * when userA (not whitelisted) tries to send the userB (is whitelisted) proof */
            await expect(
                nftContract
                    .connect(alice)
                    .whitelistMint(whitelistProof, { value: mintPrice() })
            ).to.be.revertedWith("invalid proof");
        });
        it("should revert if the whitelist has already been claimed", async () => {
            await nftContract
                .connect(bob)
                .whitelistMint(whitelistProof, { value: mintPrice() });
            await expect(
                nftContract
                    .connect(bob)
                    .whitelistMint(whitelistProof, { value: mintPrice() })
            ).to.be.revertedWith("whitelist already claimed");
        });
        it("should revert if no payment provided", async () => {
            await expect(
                nftContract.connect(bob).whitelistMint(whitelistProof)
            ).to.be.revertedWith("missing or incorrect fee");
        });

        describe("hasWhitelistMinted", () => {
            it("should return false if has not yet minted", async () => {
                expect(await nftContract.hasWhitelistMinted(bob.address)).to.eq(
                    false
                );
            });
            it("should return true if has already whitelist minted", async () => {
                await nftContract
                    .connect(bob)
                    .whitelistMint(whitelistProof, { value: mintPrice() });
                expect(await nftContract.hasWhitelistMinted(bob.address)).to.eq(
                    true
                );
            });
        });
    });

    describe("walletOf", () => {
        it("should return empty array when wallet has not tokens", async () => {
            expect(await nftContract.walletOf(deployer.address)).to.eql([]);
        });
        it("should return all tokens for address", async () => {
            await nftContract.toggleSale();
            await nftContract.connect(alice).mint(2, { value: mintPrice(2) });
            await nftContract.connect(bob).mint(2, { value: mintPrice(2) });

            const aliceTokens = [1, 2].map((num) => BigNumber.from(num));
            const bobTokens = [3, 4].map((num) => BigNumber.from(num));
            expect(await nftContract.walletOf(alice.address)).to.eql(
                aliceTokens
            );
            expect(await nftContract.walletOf(bob.address)).to.eql(bobTokens);
        });
    });

    describe("toggle sale", () => {
        it("should toggle if sale is active", async () => {
            expect(await nftContract.saleActive()).to.eq(false);
            await nftContract.toggleSale();
            expect(await nftContract.saleActive()).to.eq(true);
            await nftContract.toggleSale();
            expect(await nftContract.saleActive()).to.eq(false);
        });
        it("should revert if not the contract owner", async () => {
            await expect(
                nftContract.connect(alice).toggleSale()
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("set price", () => {
        it("should set a new mint price", async () => {
            const initialPrice = await nftContract.mintPrice();
            const newPrice = 500;
            expect(initialPrice).to.not.eq(newPrice);

            await nftContract.setPrice(newPrice);
            expect(await nftContract.mintPrice()).to.eq(newPrice);
        });
        it("should revert if not the contract owner", async () => {
            await expect(
                nftContract.connect(alice).setPrice(1000)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("base token URI", () => {
        const baseTokenURI = "www.some-token.com/";
        it("should set and get token URI", async () => {
            await nftContract.setBaseURI(baseTokenURI);
            expect(await nftContract.tokenURI(1)).to.eq(`${baseTokenURI}1`);
        });
        it("should revert if not the contract owner", async () => {
            await expect(
                nftContract.connect(alice).setBaseURI(baseTokenURI)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("contract URI", () => {
        const contractURI = "www.some-contract.com/";
        it("should set and get contract URI", async () => {
            await nftContract.setContractURI(contractURI);
            expect(await nftContract.contractURI()).to.eq(contractURI);
        });
        it("should revert if not the contract owner", async () => {
            await expect(
                nftContract.connect(alice).setContractURI(contractURI)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("set merkle root", () => {
        let merkleRoot: string;

        beforeEach(() => {
            const merkleTree = generateMerkleTree([
                bob.address,
                charlie.address,
            ]);
            merkleRoot = merkleTree.getHexRoot();
        });
        it("should set a new merkle root", async () => {
            await nftContract.setMerkleRoot(merkleRoot);
            // TODO: expect that it has been changed here
        });
        it("should revert if not the contract owner", async () => {
            await expect(
                nftContract.connect(alice).setMerkleRoot(merkleRoot)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });
});
