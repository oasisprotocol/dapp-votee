import { createContext } from 'react'
import * as sapphire from '@oasisprotocol/sapphire-paratime'
import { BigNumberish, BrowserProvider, TransactionResponse } from 'ethers'
import { type PollManager } from '@oasisprotocol/dapp-voting-backend/src/contracts'
import { DefaultReturnType } from '@oasisprotocol/dapp-voting-backend/src/contracts/common.ts'
import { Poll } from '../types'

export interface Web3ProviderState {
  isConnected: boolean
  isVoidSignerConnected: boolean
  ethProvider: BrowserProvider | null
  sapphireEthProvider: (BrowserProvider & sapphire.SapphireAnnex) | null
  account: string | null
  explorerBaseUrl: string | null
  chainName: string | null
  pollManagerVoidSigner: PollManager | null
}

export interface Web3ProviderContext {
  readonly state: Web3ProviderState
  connectWallet: () => Promise<void>
  switchNetwork: (chainId?: bigint) => Promise<void>
  getTransaction: (txHash: string) => Promise<TransactionResponse | null>
  isProviderAvailable: () => Promise<boolean>
  getPoll: () => Promise<DefaultReturnType<[Poll]> | void>
  canVoteOnPoll: () => Promise<boolean>
  vote: (choiceId: BigNumberish) => Promise<TransactionResponse | null>
  getVoteCounts: () => Promise<bigint[] | void>
}

export const Web3Context = createContext<Web3ProviderContext>({} as Web3ProviderContext)
