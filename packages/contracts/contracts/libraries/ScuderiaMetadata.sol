// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "erc721a/contracts/ERC721A.sol";

library ScuderiaMetadata {
    struct Metadata {
        string color;
    }

    string constant name = "Scuderia NFT";
    string constant description =
        "Scuderia is a fully on-chain racing NFT ecosystem that allows minting, metadata and image generation, racing and betting, all running on Polygon.";
    bytes constant alphabet = "0123456789abcdef";

    /**
     * @notice Randomise metadata for Scuderia token stats when minting
     * @param tokenId the token to generate data for
     * @dev TODO: use ChainLink VRF to get a non-deterministic random value
     */
    function generateMetadataSeed(uint256 tokenId)
        internal
        view
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    msg.sender,
                    tokenId
                )
            );
    }

    /**
     * @notice Build Scuderia NFT metadata, including name, description, SVG image and seed into a string token UTI
     * @param tokenId the token to generate the metadata struct for
     * @param seed the seed for metadata generation
     */
    function buildMetadataURI(uint256 tokenId, bytes32 seed)
        internal
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"Scuderia NFT", "image":"',
                                buildImage(seed),
                                '", "tokenId":"',
                                Strings.toString(tokenId),
                                unicode'", "description": "Scuderia is a fully on-chain racing NFT ecosystem that allows minting, metadata and image generation, racing and betting, all running on Polygon."}'
                            )
                        )
                    )
                )
            );
    }

    /**
     * @notice Build the Scuderia NFT SVG image from the initial seed
     * @param seed The seed to generate color and stat metadata
     */
    function buildImage(bytes32 seed)
        internal
        pure
        returns (bytes memory image)
    {
        string memory bgColor = seedToHexColor(seed, 6);

        image = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<?xml version="1.0" encoding="UTF-8"?>',
                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">',
                        '<style type="text/css"><![CDATA[text { font-family: monospace; font-size: 21px;} .h1 {font-size: 40px; font-weight: 600;}]]></style>',
                        '<rect width="400" height="400" fill="#ffffff" />',
                        '<rect width="400" height="400" fill-opacity="0.6" fill="#',
                        bgColor,
                        '" />',
                        '<text class="h1" x="50" y="70">Scuderia NFT</text>',
                        '<text class="h1" x="50" y="70">Scuderia NFT</text>',
                        unicode'<text x="100" y="240" style="font-size:100px;">🏎️💨</text>',
                        '<text x="20" y="350" style="font-size:28px;"> ',
                        "</text>",
                        "</svg>"
                    )
                )
            )
        );
    }

    /**
     * @notice Get a 6 digit hex color code from the seed with an offset
     */
    function seedToHexColor(bytes32 seed, uint256 offset)
        internal
        pure
        returns (string memory)
    {
        require(offset < 30, "offest out of range");

        bytes memory str = new bytes(6);
        for (uint256 i = 0; i < 3; i++) {
            str[i * 2] = alphabet[uint8(seed[i + offset] >> 4)];
            str[1 + i * 2] = alphabet[uint8(seed[i + offset] & 0x0f)];
        }
        return string(str);
    }
}
