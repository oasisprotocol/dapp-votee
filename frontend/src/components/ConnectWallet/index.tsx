import { FC, useEffect, useState } from 'react'
import { useWeb3 } from '../../hooks/useWeb3'
import { METAMASK_HOME_PAGE_URL } from '../../constants/config'
import { Button } from '../Button'
import { toErrorString, UnknownNetworkError } from '../../utils/errors'
import { ConnectedAccount } from '../ConnectedAccount'
import { useAppState } from '../../hooks/useAppState'
import classes from './index.module.css'
import { CaretRightIcon } from '../icons/CaretRightIcon'

interface Props {
  mobileSticky: boolean
}

export const ConnectWallet: FC<Props> = ({ mobileSticky }) => {
  const {
    state: { isDesktopScreen },
    setAppError,
  } = useAppState()

  const [isLoading, setIsLoading] = useState(false)
  const [providerAvailable, setProviderAvailable] = useState(true)
  const [isUnknownNetwork, setIsUnknownNetwork] = useState(false)

  const {
    state: { isConnected, account, chainName },
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

    init().catch(ex => {
      setAppError(toErrorString(ex as Error))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleConnectWallet = async () => {
    setIsLoading(true)
    try {
      await connectWallet()
    } catch (ex) {
      if (ex instanceof UnknownNetworkError) {
        setIsUnknownNetwork(true)
      } else {
        setAppError(ex as Error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwitchNetwork = async () => {
    setIsLoading(true)
    try {
      await switchNetwork()
      setIsUnknownNetwork(false)
      await handleConnectWallet()
    } catch (ex) {
      setAppError(ex as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isConnected && !providerAvailable && (
        <a href={METAMASK_HOME_PAGE_URL} target={'_blank'} rel={'noopener noreferrer'}>
          <Button
            className={classes.connectWalletBtn}
            color={mobileSticky ? 'primary' : 'secondary'}
            disabled={isLoading}
          >
            Install MetaMask
          </Button>
        </a>
      )}
      {!isConnected && providerAvailable && isUnknownNetwork && (
        <Button
          className={classes.connectWalletBtn}
          color={mobileSticky ? 'primary' : 'secondary'}
          disabled={isLoading}
          onClick={handleSwitchNetwork}
        >
          Switch Network
        </Button>
      )}
      {!isConnected && providerAvailable && !isUnknownNetwork && (
        <Button
          className={classes.connectWalletBtn}
          color={mobileSticky ? 'primary' : 'secondary'}
          disabled={isLoading}
          onClick={handleConnectWallet}
        >
          <label className={classes.connectWalletBtnLabel}>
            Connect wallet
            <CaretRightIcon size={isDesktopScreen ? 'medium' : 'small'} />
          </label>
        </Button>
      )}
      {isConnected && account && (
        <ConnectedAccount
          className={mobileSticky ? classes.stickyConnectedAccount : undefined}
          address={account}
          chainName={chainName!}
        />
      )}
    </>
  )
}
