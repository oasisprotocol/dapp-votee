import { FC, useEffect, useState } from 'react'
import { useWeb3 } from '../../hooks/useWeb3.ts'
import { METAMASK_HOME_PAGE } from '../../constants/config.ts'
import { Button } from '../Button'
import { UnknownNetworkError } from '../../utils/errors.ts'

export const ConnectWallet: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [providerAvailable, setProviderAvailable] = useState(true)
  const [isUnknownNetwork, setIsUnknownNetwork] = useState(false)
  const [, setError] = useState('')

  const {
    state: { isConnected },
    connectWallet,
    switchNetwork,
    isProviderAvailable,
  } = useWeb3()

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      setProviderAvailable(await isProviderAvailable())
      setIsLoading(false)
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSwitchNetwork = async () => {
    setIsLoading(true)
    try {
      await switchNetwork()
      setIsUnknownNetwork(false)
    } catch (ex) {
      setError((ex as Error)?.message || JSON.stringify(ex))
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectWallet = async () => {
    setIsLoading(true)
    try {
      await connectWallet()
    } catch (ex) {
      if (ex instanceof UnknownNetworkError) {
        setIsUnknownNetwork(true)
      } else {
        setError((ex as Error)?.message || JSON.stringify(ex))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isConnected && !providerAvailable && (
        <a href={METAMASK_HOME_PAGE} target={'_blank'} rel={'noopener noreferrer'}>
          <Button color="secondary" disabled={isLoading}>
            Install MetaMask
          </Button>
        </a>
      )}
      {!isConnected && providerAvailable && isUnknownNetwork && (
        <Button color="secondary" disabled={isLoading} onClick={handleSwitchNetwork}>
          Switch Network
        </Button>
      )}
      {!isConnected && providerAvailable && !isUnknownNetwork && (
        <Button color="secondary" disabled={isLoading} onClick={handleConnectWallet}>
          Connect wallet
        </Button>
      )}
      {isConnected && <span>ConnectedAccount</span>}
    </>
  )
}
