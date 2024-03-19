/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import CheckCircleSvg from '@phosphor-icons/core/assets/fill/check-circle-fill.svg?react'
import { Icon } from '../Icon'
import { IconProps } from '../../types'

export const CheckCircleIcon: FC<IconProps> = props => (
  <Icon {...props}>
    <CheckCircleSvg />
  </Icon>
)
