import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import classes from './index.module.css'
import { LogoIcon } from '../icons/LogoIcon'
import { ConnectWallet } from '../ConnectWallet'
import { Alert } from '../Alert'
import { useAppState } from '../../hooks/useAppState.ts'
import { Button } from '../Button'
import { StringUtils } from '../../utils/string.utils.ts'
import { useInView } from 'react-intersection-observer'

export const Layout: FC = () => {
  const {
    state: { isInitialLoading, appError, isMobileScreen },
    clearAppError,
  } = useAppState()

  const { ref, inView } = useInView({
    threshold: 1,
    initialInView: true,
  })

  return (
    <>
      {isMobileScreen && <div className={classes.inViewPlaceholder} ref={ref} />}
      <div className={classes.layout}>
        <main className={classes.main}>
          <header
            className={StringUtils.clsx(
              classes.header,
              isMobileScreen && !inView ? classes.headerSticky : undefined
            )}
          >
            <LogoIcon className={classes.logo} />
            <ConnectWallet mobileSticky={isMobileScreen && !inView} />
          </header>
          <section className={classes.subHeader}>
            <h1>Oasis Mascot</h1>
          </section>
          <section>
            {!isInitialLoading && appError && (
              <Alert
                type="error"
                actions={
                  <Button variant="text" onClick={clearAppError}>
                    &lt; Go back&nbsp;
                  </Button>
                }
              >
                {StringUtils.truncate(appError)}
              </Alert>
            )}
            {isInitialLoading && (
              <Alert headerText="Please wait" type="loading" actions={<span>Fetching poll...</span>} />
            )}
            {!isInitialLoading && !appError && <Outlet />}
          </section>
        </main>
      </div>
    </>
  )
}
