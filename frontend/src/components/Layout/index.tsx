import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import classes from './index.module.css'
import { LogoIcon } from '../icons/LogoIcon'
import { ConnectWallet } from '../ConnectWallet'

export const Layout: FC = () => {
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
          <Outlet />
        </section>
      </main>
    </div>
  )
}
