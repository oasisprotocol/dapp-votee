/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import CaretRightSvg from '@phosphor-icons/core/assets/bold/caret-right-bold.svg?react'
import { Icon } from '../Icon'
import { IconSize } from '../../types'

interface Props {
  size?: IconSize
}

export const CaretRightIcon: FC<Props> = ({ size }) => (
  <Icon size={size}>
    <CaretRightSvg />
  </Icon>
)
