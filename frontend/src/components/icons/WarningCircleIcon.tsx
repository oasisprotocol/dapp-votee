/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import WarningCircleSvg from '@phosphor-icons/core/assets/fill/warning-circle-fill.svg?react'
import { Icon } from '../Icon'

export const WarningCircleIcon: FC = () => (
  <Icon size="xlarge">
    <WarningCircleSvg />
  </Icon>
)
