import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import classes from './index.module.css'
import { LogoIcon } from '../icons/LogoIcon'
import { ConnectWallet } from '../ConnectWallet'
import { Alert } from '../Alert'
import { useAppState } from '../../hooks/useAppState.ts'

export const Layout: FC = () => {
  const {
    state: { isInitialLoading },
  } = useAppState()

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
          {isInitialLoading && (
            <Alert headerText="Please wait" type="loading" actions={<span>Fetching poll...</span>} />
          )}
          {!isInitialLoading && <Outlet />}
        </section>
      </main>
    </div>
  )
}
