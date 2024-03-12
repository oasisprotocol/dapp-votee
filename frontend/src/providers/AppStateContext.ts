import { createContext } from 'react'
import { Poll } from '../types/poll.ts'

export interface AppStateProviderState {
  isInitialLoading: boolean
  poll: Poll | null
}

export interface AppStateProviderContext {
  readonly state: AppStateProviderState
}

export const AppStateContext = createContext<AppStateProviderContext>({} as AppStateProviderContext)
