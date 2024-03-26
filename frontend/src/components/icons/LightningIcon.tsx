/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import CaretRightSvg from '@phosphor-icons/core/assets/fill/lightning-fill.svg?react'
import { Icon } from '../Icon'
import { IconProps } from '../../types'

export const LightningIcon: FC<IconProps> = props => (
  <Icon {...props}>
    <CaretRightSvg />
  </Icon>
)
