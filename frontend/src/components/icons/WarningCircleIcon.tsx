/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import WarningCircleSvg from '@phosphor-icons/core/assets/fill/warning-circle-fill.svg?react'
import { Icon } from '../Icon'

export const WarningCircleIcon: FC = () => (
  <Icon width={124} height={124}>
    <WarningCircleSvg />
  </Icon>
)
