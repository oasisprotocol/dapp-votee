import { createContext } from 'react'
import { MascotChoices, Poll, VotesStorage } from '../types'

export interface AppStateProviderState {
  isInitialLoading: boolean
  poll: Poll | null
  previousVotes: VotesStorage
  previousVote: MascotChoices | null
  appError: string
  isDesktopScreen: boolean
  isMobileScreen: boolean
  isUpcomingVote: boolean
}

export interface AppStateProviderContext {
  readonly state: AppStateProviderState
  setPreviousVoteForCurrentWallet: (choiceId: MascotChoices) => void
  setAppError: (error: Error | object | string) => void
  clearAppError: () => void
}

export const AppStateContext = createContext<AppStateProviderContext>({} as AppStateProviderContext)
