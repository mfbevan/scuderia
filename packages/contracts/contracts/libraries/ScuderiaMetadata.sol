// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "erc721a/contracts/ERC721A.sol";

library ScuderiaMetadata {
    struct Metadata {
        string color;
        uint256 speed;
        uint256 acceleration;
        uint256 handling;
        uint256 reliability;
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
        Metadata memory _attributes = seedToAttributes(seed);

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"Scuderia NFT", "image":"',
                                buildImage(_attributes),
                                '", "tokenId":"',
                                Strings.toString(tokenId),
                                '", "color":"',
                                _attributes.color,
                                '", "speed":"',
                                Strings.toString(_attributes.speed),
                                '", "acceleration":"',
                                Strings.toString(_attributes.acceleration),
                                '", "handling":"',
                                Strings.toString(_attributes.handling),
                                '", "reliability":"',
                                Strings.toString(_attributes.reliability),
                                unicode'", "description": "Scuderia is a fully on-chain racing NFT ecosystem that allows minting, metadata and image generation, racing and betting, all running on Polygon."}'
                            )
                        )
                    )
                )
            );
    }

    /**
     * @notice Build the Scuderia NFT SVG image from the initial seed
     * @param _metadata The metadata to use to build the SVG
     */
    function buildImage(Metadata memory _metadata)
        internal
        pure
        returns (bytes memory image)
    {
        image = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(
                bytes.concat(
                    abi.encodePacked(
                        '<?xml version="1.0" encoding="UTF-8"?>',
                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">',
                        '<style type="text/css"><![CDATA[text { font-family: monospace; font-size: 21px;} .h1 {font-size: 40px; font-weight: 600;}]]></style>',
                        '<rect width="400" height="400" fill="#ffffff" />',
                        '<rect width="400" height="400" fill-opacity="0.6" fill="#',
                        _metadata.color,
                        '" />',
                        '<text class="h1" x="50" y="70">Scuderia NFT</text>',
                        unicode'<text x="70" y="220" style="font-size:130px;">🏎️💨</text>'
                    ),
                    abi.encodePacked(
                        unicode'<text x="20" y="280" style="font-size:18px;">🔥 speed: ',
                        Strings.toString(_metadata.speed),
                        "</text>",
                        unicode'<text x="20" y="310" style="font-size:18px;">⚡ acceleration: ',
                        Strings.toString(_metadata.acceleration),
                        "</text>",
                        unicode'<text x="20" y="340" style="font-size:18px;">⚙️ handling: ',
                        Strings.toString(_metadata.handling),
                        "</text>",
                        unicode'<text x="20" y="370" style="font-size:18px;">🛠️ reliability: ',
                        Strings.toString(_metadata.reliability),
                        "</text>",
                        "</svg>"
                    )
                )
            )
        );
    }

    /**
     * @notice Get a 6 digit hex color code from the seed with an offset
     * @param _seed the token's byte32 random seed
     * @param _offset the offset to get the color code from (allows 30 possible colors to be generated from the one seed)
     */
    function seedToHexColor(bytes32 _seed, uint256 _offset)
        internal
        pure
        returns (string memory)
    {
        require(_offset < 30, "offest out of range");

        bytes memory str = new bytes(6);
        for (uint256 i = 0; i < 3; i++) {
            str[i * 2] = alphabet[uint8(_seed[i + _offset] >> 4)];
            str[1 + i * 2] = alphabet[uint8(_seed[i + _offset] & 0x0f)];
        }
        return string(str);
    }

    /**
     * @notice Generate metadata from initial random seed - color, speed, acceleration and handling
     * @param _seed the seed to generate metadata attributes
     */
    function seedToAttributes(bytes32 _seed)
        internal
        pure
        returns (Metadata memory)
    {
        return
            Metadata(
                seedToHexColor(_seed, 0),
                uint256(_seed >> 6) % 70 + 31,
                uint256(_seed >> 12) % 70 + 31,
                uint256(_seed >> 18) % 70 + 31,
                uint256(_seed >> 24) % 70 + 31
            );
    }
}
