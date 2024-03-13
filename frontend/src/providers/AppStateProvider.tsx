import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { AppStateContext, AppStateProviderContext, AppStateProviderState } from './AppStateContext.ts'
import { useWeb3 } from '../hooks/useWeb3.ts'

const appStateProviderInitialState: AppStateProviderState = {
  isInitialLoading: true,
  poll: null,
}

export const AppStateContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { isVoidSignerConnected },
    getPoll,
  } = useWeb3()

  const [state, setState] = useState<AppStateProviderState>({
    ...appStateProviderInitialState,
  })

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

  const providerState: AppStateProviderContext = {
    state,
  }

  return <AppStateContext.Provider value={providerState}>{children}</AppStateContext.Provider>
}
