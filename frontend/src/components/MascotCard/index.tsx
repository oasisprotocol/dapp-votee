import { FC, ReactElement } from 'react'
import classes from './index.module.css'
import { StringUtils } from '../../utils/string.utils.ts'

type MascotCardOrientation = 'vertical' | 'horizontal'

interface Props {
  title: string
  description: string
  image: ReactElement
  actions?: ReactElement
  selected?: boolean
  orientation?: MascotCardOrientation
}

const orientationMap: Record<MascotCardOrientation, string> = {
  vertical: classes.mascotCardVertical,
  horizontal: classes.mascotCardHorizontal,
}

export const MascotCard: FC<Props> = ({
  image,
  title,
  description,
  actions,
  selected,
  orientation = 'vertical',
}) => {
  return (
    <div
      className={StringUtils.clsx(
        classes.mascotCard,
        selected ? classes.mascotCardSelected : undefined,
        orientationMap[orientation]
      )}
    >
      {image}
      <div>
        <h3 className={classes.mascotCardTitle}>{title}</h3>
        <p className={classes.mascotCardDescription}>{description}</p>
      </div>
      {actions}
    </div>
  )
}
