import { createContext } from 'react'
import * as sapphire from '@oasisprotocol/sapphire-paratime'
import { BigNumberish, BrowserProvider, ContractTransactionResponse, TransactionResponse } from 'ethers'
import { type PollManager } from '@oasisprotocol/dapp-voting-backend/src/contracts'
import { DefaultReturnType } from '@oasisprotocol/dapp-voting-backend/src/contracts/common.ts'

export interface Web3ProviderState {
  isConnected: boolean
  isVoidSignerConnected: boolean
  ethProvider: BrowserProvider | null
  sapphireEthProvider: (BrowserProvider & sapphire.SapphireAnnex) | null
  account: string | null
  explorerBaseUrl: string | null
  networkName: string | null
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
  getPoll: () => Promise<
    DefaultReturnType<
      [
        [boolean, bigint, PollManager.ProposalParamsStructOutput] & {
          active: boolean
          topChoice: bigint
          params: PollManager.ProposalParamsStructOutput
        },
      ]
    >
  >
  canVoteOnPoll: () => Promise<boolean>
  vote: (choiceId: BigNumberish) => Promise<ContractTransactionResponse>
}

export const Web3Context = createContext<Web3ProviderContext>({} as Web3ProviderContext)
