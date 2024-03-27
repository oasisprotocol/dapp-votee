/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import LightningSvg from '@phosphor-icons/core/assets/fill/lightning-fill.svg?react'
import { Icon } from '../Icon'
import { IconProps } from '../../types'

export const LightningIcon: FC<IconProps> = props => (
  <Icon {...props}>
    <LightningSvg />
  </Icon>
)
