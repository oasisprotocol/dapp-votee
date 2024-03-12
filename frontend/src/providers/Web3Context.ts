import { createContext } from 'react'
import * as sapphire from '@oasisprotocol/sapphire-paratime'
import { BigNumberish, BrowserProvider, Signer, TransactionResponse } from 'ethers'
import { type PollManager } from '@oasisprotocol/dapp-voting-backend/src/contracts'
import { DefaultReturnType } from '@oasisprotocol/dapp-voting-backend/src/contracts/common.ts'
import { Poll } from '../types/poll.ts'

export interface Web3ProviderState {
  isConnected: boolean
  isVoidSignerConnected: boolean
  ethProvider: BrowserProvider | null
  sapphireEthProvider: (BrowserProvider & sapphire.SapphireAnnex) | null
  signer: Signer | null
  account: string | null
  explorerBaseUrl: string | null
  chainName: string | null
  pollManager: PollManager | null
  pollManagerVoidSigner: PollManager | null
}

export interface Web3ProviderContext {
  readonly state: Web3ProviderState
  connectWallet: () => Promise<void>
  switchNetwork: (chainId?: bigint) => Promise<void>
  getBalance: () => Promise<bigint>
  getTransaction: (txHash: string) => Promise<TransactionResponse | null>
  isProviderAvailable: () => Promise<boolean>
  getPoll: () => Promise<DefaultReturnType<[Poll]>>
  canVoteOnPoll: () => Promise<boolean>
  vote: (choiceId: BigNumberish) => Promise<TransactionResponse | null>
}

export const Web3Context = createContext<Web3ProviderContext>({} as Web3ProviderContext)
