/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import TrophySvg from '@phosphor-icons/core/assets/fill/trophy-fill.svg?react'
import { Icon } from '../Icon'
import { IconProps } from '../../types'

export const TrophyIcon: FC<IconProps> = props => (
  <Icon {...props}>
    <TrophySvg />
  </Icon>
)
