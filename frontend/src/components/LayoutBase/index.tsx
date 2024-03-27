import { FC, PropsWithChildren } from 'react'
import classes from './index.module.css'
import {
  GITHUB_REPOSITORY_URL,
  VITE_REACT_APP_BUILD_DATETIME,
  VITE_REACT_APP_BUILD_VERSION,
} from '../../constants/config'
import { DateUtils } from '../../utils/date.utils'
import { useMediaQuery } from 'react-responsive'

export const LayoutBase: FC<PropsWithChildren> = ({ children }) => {
  // Can't reuse AppStateContextProvider, due to this component being used in ErrorBoundary
  const isDesktopScreen = useMediaQuery({ query: '(min-width: 1000px)' })

  return (
    <div className={classes.layout}>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        {VITE_REACT_APP_BUILD_VERSION && VITE_REACT_APP_BUILD_DATETIME && (
          <div className={classes.buildInfo}>
            <div>
              Version:{' '}
              <a
                href={`${GITHUB_REPOSITORY_URL}commit/${VITE_REACT_APP_BUILD_VERSION}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {VITE_REACT_APP_BUILD_VERSION.substring(0, 7)}
              </a>{' '}
              built on{' '}
              {DateUtils.intlDateFormat(VITE_REACT_APP_BUILD_DATETIME, { longFormat: isDesktopScreen })}
            </div>
          </div>
        )}
        <a href={GITHUB_REPOSITORY_URL} rel="noopener noreferrer" target="_blank">
          GitHub
        </a>
      </footer>
    </div>
  )
}
