import { createContext } from 'react'

export type ConfigProviderState = Omit<ImportMetaEnv, 'VITE_NETWORK'> & { VITE_NETWORK: bigint }

export interface ConfigProviderContext {
  readonly state: ConfigProviderState
}

export const ConfigContext = createContext<ConfigProviderContext>({} as ConfigProviderContext)
