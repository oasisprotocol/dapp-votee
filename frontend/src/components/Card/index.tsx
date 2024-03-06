import { FC, PropsWithChildren } from 'react'
import classes from './index.module.css'

interface Props extends PropsWithChildren {
  className?: string
}

export const Card: FC<Props> = ({ children, className }) => {
  return <div className={[classes.card, ...(className ? [className] : [])].join(' ')}>{children}</div>
}
