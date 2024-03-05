import { createContext } from 'react'
import * as sapphire from '@oasisprotocol/sapphire-paratime'
import { BrowserProvider, TransactionResponse } from 'ethers'

export interface Web3ProviderState {
  isConnected: boolean
  ethProvider: BrowserProvider | null
  sapphireEthProvider: (BrowserProvider & sapphire.SapphireAnnex) | null
  account: string | null
  explorerBaseUrl: string | null
  networkName: string | null
}

export interface Web3ProviderContext {
  readonly state: Web3ProviderState
  connectWallet: () => Promise<void>
  switchNetwork: (chainId?: number) => Promise<void>
  getBalance: () => Promise<bigint>
  getTransaction: (txHash: string) => Promise<TransactionResponse | null>
  isProviderAvailable: () => Promise<boolean>
}

export const Web3Context = createContext<Web3ProviderContext>({} as Web3ProviderContext)
