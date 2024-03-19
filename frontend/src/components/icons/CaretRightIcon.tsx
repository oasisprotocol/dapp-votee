/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import CaretRightSvg from '@phosphor-icons/core/assets/bold/caret-right-bold.svg?react'
import { Icon } from '../Icon'
import { IconProps } from '../../types'

export const CaretRightIcon: FC<IconProps> = props => (
  <Icon {...props}>
    <CaretRightSvg />
  </Icon>
)
