/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from 'ethers'
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from '@nomicfoundation/hardhat-ethers/types'

import * as Contracts from '.'

declare module 'hardhat/types/runtime' {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: 'IERC165',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>
    getContractFactory(
      name: 'AllowAllACL',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AllowAllACL__factory>
    getContractFactory(
      name: 'NativeBalanceACL',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NativeBalanceACL__factory>
    getContractFactory(
      name: 'PollManager',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PollManager__factory>
    getContractFactory(
      name: 'IPollACL',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPollACL__factory>
    getContractFactory(
      name: 'IPollManager',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPollManager__factory>
    getContractFactory(
      name: 'IPollManagerACL',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPollManagerACL__factory>

    getContractAt(
      name: 'IERC165',
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>
    getContractAt(
      name: 'AllowAllACL',
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AllowAllACL>
    getContractAt(
      name: 'NativeBalanceACL',
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.NativeBalanceACL>
    getContractAt(
      name: 'PollManager',
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.PollManager>
    getContractAt(
      name: 'IPollACL',
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IPollACL>
    getContractAt(
      name: 'IPollManager',
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IPollManager>
    getContractAt(
      name: 'IPollManagerACL',
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IPollManagerACL>

    deployContract(
      name: 'IERC165',
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>
    deployContract(
      name: 'AllowAllACL',
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AllowAllACL>
    deployContract(
      name: 'NativeBalanceACL',
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.NativeBalanceACL>
    deployContract(
      name: 'PollManager',
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PollManager>
    deployContract(
      name: 'IPollACL',
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPollACL>
    deployContract(
      name: 'IPollManager',
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPollManager>
    deployContract(
      name: 'IPollManagerACL',
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPollManagerACL>

    deployContract(
      name: 'IERC165',
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>
    deployContract(
      name: 'AllowAllACL',
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AllowAllACL>
    deployContract(
      name: 'NativeBalanceACL',
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.NativeBalanceACL>
    deployContract(
      name: 'PollManager',
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PollManager>
    deployContract(
      name: 'IPollACL',
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPollACL>
    deployContract(
      name: 'IPollManager',
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPollManager>
    deployContract(
      name: 'IPollManagerACL',
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPollManagerACL>

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>
  }
}
