import { createContext } from 'react'
import { MascotChoices, Poll, VotesStorage } from '../types'

export interface AppStateProviderState {
  isInitialLoading: boolean
  poll: Poll | null
  previousVotes: VotesStorage
  previousVote: MascotChoices | null
}

export interface AppStateProviderContext {
  readonly state: AppStateProviderState
  setPreviousVoteForCurrentWallet: (choiceId: MascotChoices) => void
}

export const AppStateContext = createContext<AppStateProviderContext>({} as AppStateProviderContext)
