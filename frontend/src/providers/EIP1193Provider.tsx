import { FC, PropsWithChildren } from 'react'
import { BrowserProvider, type Eip1193Provider, toBeHex } from 'ethers'
import * as sapphire from '@oasisprotocol/sapphire-paratime'
import { EIP1193Error } from '../utils/errors'
import detectEthereumProvider from '@metamask/detect-provider'
import { EIP1193Context, EIP1193ProviderContext } from './EIP1193Context.ts'
import { useConfig } from '../hooks/useConfig.ts'

declare global {
  interface Window {
    ethereum?: BrowserProvider & Eip1193Provider & sapphire.SapphireAnnex
  }
}

export const EIP1193ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { VITE_NETWORK },
  } = useConfig()

  const isEIP1193ProviderAvailable = async () => {
    const provider = await detectEthereumProvider({
      // Explicitly set, provider doesn't have to be MetaMask
      mustBeMetaMask: false,
    })

    return !!provider
  }

  const connectWallet = async (): Promise<string> => {
    const accounts: string[] = await (window.ethereum?.request?.({ method: 'eth_requestAccounts' }) ||
      Promise.resolve([]))

    if (!accounts || accounts?.length <= 0) {
      throw new Error('[EIP1193Context] Request account failed!')
    }

    return accounts[0]
  }

  const _addNetwork = (chainId = VITE_NETWORK) => {
    if (chainId === 23294n) {
      return window.ethereum?.request?.({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x5afe',
            chainName: 'Oasis Sapphire',
            nativeCurrency: {
              name: 'ROSE',
              symbol: 'ROSE',
              decimals: 18,
            },
            rpcUrls: ['https://sapphire.oasis.io/', 'wss://sapphire.oasis.io/ws'],
            blockExplorerUrls: ['https://explorer.oasis.io/mainnet/sapphire'],
          },
        ],
      })
    }

    throw new Error('Unable to automatically add the network, please do it manually!')
  }

  const switchNetwork = async (toChainId = VITE_NETWORK) => {
    const ethProvider = new BrowserProvider(window.ethereum!)
    const sapphireEthProvider = sapphire.wrap(ethProvider) as BrowserProvider & sapphire.SapphireAnnex

    const network = await sapphireEthProvider.getNetwork()

    if (network.chainId === BigInt(toChainId)) return

    try {
      const chainId = toBeHex(toChainId).replace('0x0', '0x')

      await window.ethereum!.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
    } catch (e) {
      const error = e as EIP1193Error
      // EIP1193 desktop - Throws e.code 4902 when chain is not available
      // Metamask mobile(edge case) - Throws generic -32603 (https://github.com/MetaMask/metamask-mobile/issues/3312)

      if (error?.code !== 4902 && error?.code !== -32603) {
        throw error
      } else {
        _addNetwork(toChainId)
      }
    }
  }

  const providerState: EIP1193ProviderContext = {
    isEIP1193ProviderAvailable,
    connectWallet,
    switchNetwork,
  }

  return <EIP1193Context.Provider value={providerState}>{children}</EIP1193Context.Provider>
}
