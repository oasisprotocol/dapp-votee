import { FC, PropsWithChildren } from 'react'
import classes from './index.module.css'

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.card}>{children}</div>
}
