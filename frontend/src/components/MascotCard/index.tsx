import { FC, ReactElement } from 'react'
import Tilt from 'react-parallax-tilt'
import { StringUtils } from '../../utils/string.utils.ts'
import classes from './index.module.css'
import { useAppState } from '../../hooks/useAppState.ts'

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
  const {
    state: { isDesktopScreen },
  } = useAppState()

  return (
    <Tilt tiltReverse tiltMaxAngleX={2} tiltMaxAngleY={10} {...(isDesktopScreen ? { scale: 1.05 } : {})}>
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
    </Tilt>
  )
}
