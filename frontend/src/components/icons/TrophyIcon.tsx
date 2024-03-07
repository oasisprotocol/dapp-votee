/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import TrophySvg from '@phosphor-icons/core/assets/fill/trophy-fill.svg?react'
import { Icon } from '../Icon'

export const TrophyIcon: FC = () => (
  <Icon size="small">
    <TrophySvg />
  </Icon>
)
