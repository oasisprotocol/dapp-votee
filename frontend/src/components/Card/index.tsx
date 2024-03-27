import { FC, PropsWithChildren } from 'react'
import classes from './index.module.css'
import { StringUtils } from '../../utils/string.utils'

interface Props extends PropsWithChildren {
  className?: string
}

export const Card: FC<Props> = ({ children, className }) => {
  return <div className={StringUtils.clsx(classes.card, className)}>{children}</div>
}
