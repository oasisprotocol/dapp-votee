import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { ConfigContext, ConfigProviderContext, ConfigProviderState } from './ConfigContext.ts'

const configProviderInitialState: ConfigProviderState = {
  VITE_NETWORK: 0n,
  VITE_WEB3_GATEWAY: '',
  VITE_CONTRACT_ACL_ALLOWALL: '',
  VITE_CONTRACT_ACL_NATIVEBALANCE: '',
  VITE_CONTRACT_POLLMANAGER: '',
  VITE_CONTRACT_POLLMANAGER_ACL: '',
  VITE_PROPOSAL_ID: '',
}

export const ConfigContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<ConfigProviderState>({
    ...configProviderInitialState,
  })

  useEffect(() => {
    const {
      VITE_NETWORK,
      VITE_WEB3_GATEWAY,
      VITE_CONTRACT_ACL_ALLOWALL,
      VITE_CONTRACT_ACL_NATIVEBALANCE,
      VITE_CONTRACT_POLLMANAGER,
      VITE_CONTRACT_POLLMANAGER_ACL,
      VITE_PROPOSAL_ID,
    } = import.meta.env

    setState({
      VITE_NETWORK: BigInt(VITE_NETWORK),
      VITE_WEB3_GATEWAY,
      VITE_CONTRACT_ACL_ALLOWALL,
      VITE_CONTRACT_ACL_NATIVEBALANCE,
      VITE_CONTRACT_POLLMANAGER,
      VITE_CONTRACT_POLLMANAGER_ACL,
      VITE_PROPOSAL_ID,
    })
  }, [])

  const providerState: ConfigProviderContext = {
    state,
  }

  return <ConfigContext.Provider value={providerState}>{children}</ConfigContext.Provider>
}
