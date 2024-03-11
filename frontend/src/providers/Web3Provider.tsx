import { FC, PropsWithChildren, useCallback, useState } from 'react'
import * as sapphire from '@oasisprotocol/sapphire-paratime'
import { NETWORKS } from '../constants/config'
import { UnknownNetworkError } from '../utils/errors'
import { Web3Context, Web3ProviderContext, Web3ProviderState } from './Web3Context'
import { useEIP1193 } from '../hooks/useEIP1193.ts'
import { BrowserProvider } from 'ethers'
import { useConfig } from '../hooks/useConfig.ts'

const web3ProviderInitialState: Web3ProviderState = {
  isConnected: false,
  ethProvider: null,
  sapphireEthProvider: null,
  account: null,
  explorerBaseUrl: null,
  networkName: null,
}

export const Web3ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { VITE_NETWORK },
  } = useConfig()
  const {
    isEIP1193ProviderAvailable,
    connectWallet: connectWalletEIP1193,
    switchNetwork: switchNetworkEIP1193,
  } = useEIP1193()

  const [state, setState] = useState<Web3ProviderState>({
    ...web3ProviderInitialState,
  })

  const _connectionChanged = (isConnected: boolean) => {
    setState(prevState => ({
      ...prevState,
      isConnected,
    }))
  }

  const _accountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length <= 0) {
      _connectionChanged(false)
      return
    }

    const [account] = accounts
    setState(prevState => ({
      ...prevState,
      account,
    }))
  }, [])

  const _setNetworkSpecificVars = (
    chainId: bigint,
    sapphireEthProvider = state.sapphireEthProvider!
  ): void => {
    if (!sapphireEthProvider) {
      throw new Error('[Web3Context] Sapphire provider is required!')
    }

    if (!NETWORKS.has(chainId)) {
      throw new UnknownNetworkError('Unknown network!')
    }

    const { explorerBaseUrl, networkName } = NETWORKS.get(chainId)!

    setState(prevState => ({
      ...prevState,
      explorerBaseUrl,
      networkName,
    }))
  }

  const _chainChanged = useCallback(() => {
    // TODO: Integrate seamlessly, so that page reload is not needed
    window.location.reload()
  }, [])

  const _connect = useCallback(() => _connectionChanged(true), [])
  const _disconnect = useCallback(() => _connectionChanged(false), [])

  // TODO: Try with removeListener(off seems specific for MetaMask), upon initializing the provider(network change)
  const _addEventListenersOnce = (() => {
    let eventListenersInitialized = false
    return (ethProvider: typeof window.ethereum) => {
      if (eventListenersInitialized) {
        return
      }

      ethProvider?.on?.('accountsChanged', _accountsChanged)
      ethProvider?.on?.('chainChanged', _chainChanged)
      ethProvider?.on?.('connect', _connect)
      ethProvider?.on?.('disconnect', _disconnect)

      eventListenersInitialized = true
    }
  })()

  const _init = async (account: string, provider: typeof window.ethereum) => {
    try {
      const ethProvider = new BrowserProvider(provider!)
      const sapphireEthProvider = sapphire.wrap(ethProvider) as BrowserProvider & sapphire.SapphireAnnex

      const network = await sapphireEthProvider.getNetwork()
      _setNetworkSpecificVars(network.chainId, sapphireEthProvider)

      setState(prevState => ({
        ...prevState,
        isConnected: true,
        ethProvider,
        sapphireEthProvider,
        account,
      }))
    } catch (ex) {
      setState(prevState => ({
        ...prevState,
        isConnected: false,
      }))

      if (ex instanceof UnknownNetworkError) {
        throw ex
      } else {
        throw new Error('[Web3Context] Unable to initialize providers!')
      }
    }
  }

  const getBalance = async () => {
    const { account, sapphireEthProvider } = state

    if (!account || !sapphireEthProvider) {
      throw new Error('[Web3Context] Unable to fetch balance!')
    }

    return await sapphireEthProvider.getBalance(account)
  }

  const isProviderAvailable = async () => {
    return isEIP1193ProviderAvailable()
  }

  const connectWallet = async () => {
    const account = await connectWalletEIP1193()

    if (!account) {
      throw new Error('[Web3Context] Request account failed!')
    }

    await _init(account, window.ethereum)
    _addEventListenersOnce(window.ethereum)
  }

  const switchNetwork = async (chainId = VITE_NETWORK) => {
    return switchNetworkEIP1193(chainId)
  }

  const getTransaction = async (txHash: string) => {
    if (!txHash) {
      throw new Error('[txHash] is required!')
    }

    const { sapphireEthProvider } = state

    if (!sapphireEthProvider) {
      throw new Error('[sapphireEthProvider] not initialized!')
    }

    const txReceipt = await sapphireEthProvider.waitForTransaction(txHash, 1, 60000)
    if (txReceipt?.status === 0) throw new Error('Transaction failed')

    return await sapphireEthProvider.getTransaction(txHash)
  }

  const providerState: Web3ProviderContext = {
    state,
    isProviderAvailable,
    connectWallet,
    switchNetwork,
    getBalance,
    getTransaction,
  }

  return <Web3Context.Provider value={providerState}>{children}</Web3Context.Provider>
}
