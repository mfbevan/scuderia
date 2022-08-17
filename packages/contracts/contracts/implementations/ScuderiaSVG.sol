// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";


library ScuderiaSVG {
    function getSVG() public view returns (string memory) {
        bytes memory image = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<?xml version="1.0" encoding="UTF-8"?>',
                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">',
                        '<style type="text/css"><![CDATA[text { font-family: monospace; font-size: 21px;} .h1 {font-size: 40px; font-weight: 600;}]]></style>',
                        '<rect width="400" height="400" fill="#ffffff" />',
                        '<text class="h1" x="50" y="70">Knight of the</text>',
                        '<text class="h1" x="80" y="120" >BuidlGuidl</text>',
                        unicode'<text x="70" y="240" style="font-size:100px;">🏗️ 🏰</text>',
                        unicode'<text x="210" y="305">Wallet Ξ',
                        "</text>",
                        '<text x="20" y="350" style="font-size:28px;"> ',
                        "</text>",
                        '<text x="20" y="380" style="font-size:14px;">0x',
                        "</text>",
                        "</svg>"
                    )
                )
            )
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"BuidlGuidl Tabard", "image":"',
                                image,
                                unicode'", "description": "This NFT marks the bound address as a member of the BuidlGuidl. The image is a fully-onchain dynamic SVG reflecting current balances of the bound wallet and builder work stream."}'
                            )
                        )
                    )
                )
            );
    }
}
