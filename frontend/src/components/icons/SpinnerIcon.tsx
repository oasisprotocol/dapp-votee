/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import SpinnerSvg from '@phosphor-icons/core/assets/regular/spinner.svg?react'
import { Icon } from '../Icon'
import { IconProps } from '../../types'

export const SpinnerIcon: FC<IconProps> = ({ size = 'large', ...restProps }) => (
  <Icon size={size} {...restProps}>
    <SpinnerSvg />
  </Icon>
)
