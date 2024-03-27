import createJazzIcon from '@metamask/jazzicon'
import classes from './index.module.css'
import { FC, memo, useEffect, useRef } from 'react'
import { NumberUtils } from '../../utils/number.utils'

interface JazzIconProps {
  address: string
  size: number
}

const JazzIconCmp: FC<JazzIconProps> = ({ address, size }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref?.current) {
      const seed = NumberUtils.jsNumberForAddress(address)
      const icon = createJazzIcon(size, seed)

      ref.current?.replaceChildren(icon)
    }
  }, [size, ref, address])

  return <div ref={ref} style={{ width: size, height: size }} className={classes.jazzIcon} />
}

export const JazzIcon = memo(JazzIconCmp)
