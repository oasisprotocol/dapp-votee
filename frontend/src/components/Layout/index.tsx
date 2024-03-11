import { FC, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import classes from './index.module.css'
import { LogoIcon } from '../icons/LogoIcon'
import { ConnectWallet } from '../ConnectWallet'
import { useWeb3 } from '../../hooks/useWeb3.ts'
import { Alert } from '../Alert'

export const Layout: FC = () => {
  const {
    state: { isVoidSignerConnected },
    getPoll,
  } = useWeb3()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isVoidSignerConnected) return

    const init = async () => {
      const {
        active,
        params: { closeTimestamp, numChoices },
      } = await getPoll()

      if (numChoices !== 3n) {
        console.warn('[numChoices] Unexpected number of poll choices, this dApp may not behave as expected!')
      }

      setIsLoading(false)

      if (!active) {
        navigate('/results')
        console.log('closeTimestamp', closeTimestamp)
      } else {
        navigate('/')
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoidSignerConnected])

  return (
    <div className={classes.layout}>
      <main className={classes.main}>
        <header className={classes.header}>
          <LogoIcon />
          <ConnectWallet />
        </header>
        <section className={classes.subHeader}>
          <h1>Oasis Mascot</h1>
        </section>
        <section>
          {isLoading && (
            <Alert headerText="Please wait" type="loading" actions={<span>Fetching poll...</span>} />
          )}
          {!isLoading && <Outlet />}
        </section>
      </main>
    </div>
  )
}
