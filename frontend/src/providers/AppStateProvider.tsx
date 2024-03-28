import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { AppStateContext, AppStateProviderContext, AppStateProviderState } from './AppStateContext'
import { useWeb3 } from '../hooks/useWeb3'
import { storage } from '../utils/storage'
import { StorageKeys } from '../constants/storage-keys'
import { MascotChoices } from '../types'
import { NumberUtils } from '../utils/number.utils'
import { useMediaQuery } from 'react-responsive'
import { UpcomingPollError, toErrorString } from '../utils/errors'

const localStorageStore = storage()

const appStateProviderInitialState: AppStateProviderState = {
  isInitialLoading: true,
  poll: null,
  previousVotes: localStorageStore.get(StorageKeys.Votes) ?? {},
  previousVote: null,
  appError: '',
  isMobileScreen: false,
  isDesktopScreen: false,
  isUpcomingVote: false,
}

export const AppStateContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const isDesktopScreen = useMediaQuery({ query: '(min-width: 1000px)' })
  const {
    state: { isVoidSignerConnected, account },
    getPoll,
  } = useWeb3()

  const [state, setState] = useState<AppStateProviderState>({
    ...appStateProviderInitialState,
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      isDesktopScreen,
      isMobileScreen: !isDesktopScreen,
    }))
  }, [isDesktopScreen])

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
      const poll = (await getPoll())!

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

    init().catch(ex => {
      if (ex instanceof UpcomingPollError) {
        setState(prevState => ({
          ...prevState,
          isInitialLoading: false,
          isUpcomingVote: true,
        }))
      } else {
        setAppError(toErrorString(ex as Error))
      }
    })
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

    setState(prevState => ({
      ...prevState,
      appError: toErrorString(error as Error),
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
