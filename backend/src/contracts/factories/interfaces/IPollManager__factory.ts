/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers'
import type { IPollManager, IPollManagerInterface } from '../../interfaces/IPollManager'

const _abi = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'in_proposalId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'in_voter',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'in_data',
        type: 'bytes',
      },
    ],
    name: 'canVoteOnPoll',
    outputs: [
      {
        internalType: 'uint256',
        name: 'out_weight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getACL',
    outputs: [
      {
        internalType: 'contract IPollManagerACL',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'proposalId',
        type: 'bytes32',
      },
    ],
    name: 'getPollACL',
    outputs: [
      {
        internalType: 'contract IPollACL',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export class IPollManager__factory {
  static readonly abi = _abi
  static createInterface(): IPollManagerInterface {
    return new Interface(_abi) as IPollManagerInterface
  }
  static connect(address: string, runner?: ContractRunner | null): IPollManager {
    return new Contract(address, _abi, runner) as unknown as IPollManager
  }
}
