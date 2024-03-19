import { FC, PropsWithChildren } from 'react'
import classes from './index.module.css'

export const LayoutBase: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <main className={classes.main}>{children}</main>
    </div>
  )
}
