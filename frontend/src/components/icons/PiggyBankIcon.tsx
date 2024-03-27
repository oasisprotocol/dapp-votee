/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import PiggyBankSvg from '@phosphor-icons/core/assets/regular/piggy-bank.svg?react'
import { Icon } from '../Icon'
import { IconProps } from '../../types'

export const PiggyBankIcon: FC<IconProps> = ({ size = 'large', ...restProps }) => (
  <Icon size={size} {...restProps}>
    <PiggyBankSvg />
  </Icon>
)
