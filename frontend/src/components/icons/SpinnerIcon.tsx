/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react'
import SpinnerSvg from '@phosphor-icons/core/assets/regular/spinner.svg?react'
import { Icon } from '../Icon'

export const SpinnerIcon: FC = () => (
  <Icon size="large">
    <SpinnerSvg />
  </Icon>
)
