import { FC, ReactElement } from 'react'
import classes from './index.module.css'

interface Props {
  image: ReactElement
  title: string
  value: string
}

export const MascotTieCard: FC<Props> = ({ image, title, value }) => {
  return (
    <div className={classes.mascotTieCard}>
      {image}
      <h3 className={classes.mascotTieCardTitle}>{title}</h3>
      <p className={classes.mascotTieCardValue}>{value}</p>
    </div>
  )
}
