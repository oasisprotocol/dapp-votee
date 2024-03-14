import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { AppStateContext, AppStateProviderContext, AppStateProviderState } from './AppStateContext.ts'
import { useWeb3 } from '../hooks/useWeb3.ts'
import { storage } from '../utils/storage.ts'
import { StorageKeys } from '../constants/storage-keys.ts'
import { MascotChoices } from '../types'
import { NumberUtils } from '../utils/number.utils.ts'

const localStorageStore = storage()

const appStateProviderInitialState: AppStateProviderState = {
  isInitialLoading: true,
  poll: null,
  previousVotes: localStorageStore.get(StorageKeys.Votes) ?? {},
  previousVote: null,
  appError: '',
}

export const AppStateContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { isVoidSignerConnected, account },
    getPoll,
  } = useWeb3()

  const [state, setState] = useState<AppStateProviderState>({
    ...appStateProviderInitialState,
  })

  useEffect(() => {
    if (!account) return

    setState(prevState => ({
      ...prevState,
      previousVote: NumberUtils.isValidMascotChoiceId(state.previousVotes[account])
        ? state.previousVotes[account]
        : null,
    }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  /**
   * Save previousVotes to storage, upon previousVotes change
   */
  useEffect(() => {
    localStorageStore.set(StorageKeys.Votes, state.previousVotes)
  }, [state.previousVotes])

  useEffect(() => {
    if (!isVoidSignerConnected) return

    const init = async () => {
      const poll = await getPoll()
      const {
        params: { numChoices },
      } = poll

      if (numChoices !== 3n) {
        console.warn('[numChoices] Unexpected number of poll choices, this dApp may not behave as expected!')
      }

      setState(prevState => ({
        ...prevState,
        isInitialLoading: false,
        poll,
      }))
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoidSignerConnected])

  const setPreviousVoteForCurrentWallet = (choiceId: MascotChoices) => {
    if (!account) return
    if (!NumberUtils.isValidMascotChoiceId(choiceId)) return

    setState(prevState => ({
      ...prevState,
      previousVotes: {
        ...prevState.previousVotes,
        [account]: choiceId,
      },
    }))
  }

  const setAppError = (error: Error | object | string) => {
    if (error === undefined || error === null) return

    let appError = ''

    if (Object.prototype.hasOwnProperty.call(error, 'message')) {
      appError = (error as Error).message
    } else if (typeof error === 'object') {
      appError = JSON.stringify(appError)
    } else {
      appError = error
    }

    setState(prevState => ({
      ...prevState,
      appError,
    }))
  }

  const clearAppError = () => {
    setState(prevState => ({
      ...prevState,
      appError: '',
    }))
  }

  const providerState: AppStateProviderContext = {
    state,
    setPreviousVoteForCurrentWallet,
    setAppError,
    clearAppError,
  }

  return <AppStateContext.Provider value={providerState}>{children}</AppStateContext.Provider>
}
