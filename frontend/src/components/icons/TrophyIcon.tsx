/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import TrophySvg from '@phosphor-icons/core/assets/fill/trophy-fill.svg?react'
import { Icon } from '../Icon'
import { IconSize } from '../../types'

interface Props {
  size?: IconSize
  width?: number | string
  height?: number | string
}

export const TrophyIcon: FC<Props> = ({ size, width, height }) => (
  <Icon size={size} width={width} height={height}>
    <TrophySvg />
  </Icon>
)
