import { FC } from 'react'
import classes from './index.module.css'
import { LightningIcon } from '../icons/LightningIcon'

interface Props {
  isLargeIcon?: boolean
}

export const MascotTieSplit: FC<Props> = ({ isLargeIcon = false }) => {
  const lightningIconProps = isLargeIcon ? { width: 42, height: 42 } : {}

  return (
    <div className={classes.mascotTieSplit}>
      <LightningIcon {...lightningIconProps} />
      <p className={classes.mascotTieSplitText}>vs</p>
    </div>
  )
}
