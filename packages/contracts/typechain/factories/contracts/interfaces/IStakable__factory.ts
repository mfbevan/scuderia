/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IStakable,
  IStakableInterface,
} from "../../../contracts/interfaces/IStakable";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "CannotTransferStaked",
    type: "error",
  },
  {
    inputs: [],
    name: "NotTokenOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "TokenAlreadyStaked",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "TokenInLockin",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "TokenNotStaked",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_tokens",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_lockinPeriod",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_tokens",
        type: "uint256[]",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokens",
        type: "uint256[]",
      },
    ],
    name: "getStakeStatus",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "timeStaked",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "lockinPeriod",
            type: "uint64",
          },
        ],
        internalType: "struct IStakable.StakedToken[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokens",
        type: "uint256[]",
      },
      {
        internalType: "enum IStakable.LockinPeriod",
        name: "_lockin",
        type: "uint8",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokens",
        type: "uint256[]",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IStakable__factory {
  static readonly abi = _abi;
  static createInterface(): IStakableInterface {
    return new utils.Interface(_abi) as IStakableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IStakable {
    return new Contract(address, _abi, signerOrProvider) as IStakable;
  }
}
