import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import classes from './index.module.css'
import { LogoIcon } from '../icons/LogoIcon'
import { Button } from '../Button'

export const Layout: FC = () => {
  return (
    <div className={classes.layout}>
      <main className={classes.main}>
        <header className={classes.header}>
          <LogoIcon />
          <Button color="secondary">Connect Wallet</Button>
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
