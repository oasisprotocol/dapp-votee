import { FC, ReactElement } from 'react'
import classes from './index.module.css'

interface Props {
  title: string
  description: string
  image: ReactElement
  actions: ReactElement
}

export const MascotCard: FC<Props> = ({ image, title, description, actions }) => {
  return (
    <div className={classes.mascotCard}>
      {image}
      <h3 className={classes.mascotCardTitle}>{title}</h3>
      <p className={classes.mascotCardDescription}>{description}</p>
      {actions}
    </div>
  )
}
