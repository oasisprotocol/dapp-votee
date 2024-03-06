/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import CheckCircleSvg from '@phosphor-icons/core/assets/fill/check-circle-fill.svg?react'
import { Icon } from '../Icon'

export const CheckCircleIcon: FC = () => (
  <Icon size="xlarge">
    <CheckCircleSvg />
  </Icon>
)
