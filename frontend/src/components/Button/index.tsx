import classes from './index.module.css'
import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import { StringUtils } from '../../utils/string.utils.ts'

type ButtonSize = 'small' | 'medium'
type ButtonColor = 'primary' | 'secondary'
type ButtonVariant = 'solid' | 'outline'

interface Props extends PropsWithChildren {
  disabled?: boolean
  color?: ButtonColor
  size?: ButtonSize
  variant?: ButtonVariant
  fullWidth?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: 'submit' | 'reset' | 'button'
}

const sizeMap: Record<ButtonSize, string> = {
  small: classes.buttonSmall,
  medium: classes.buttonMedium,
}

const colorMap: Record<ButtonColor, string> = {
  primary: classes.buttonPrimary,
  secondary: classes.buttonSecondary,
}

const variantMap: Record<ButtonVariant, string> = {
  solid: classes.buttonSolid,
  outline: classes.buttonOutline,
}

export const Button: FC<Props> = ({
  className,
  children,
  disabled,
  color = 'primary',
  size = 'medium',
  variant = 'solid',
  fullWidth,
  onClick,
  type,
}) => (
  <button
    className={StringUtils.clsx(
      className,
      classes.button,
      disabled ? classes.buttonDisabled : undefined,
      fullWidth ? classes.fullWidth : undefined,
      colorMap[color],
      sizeMap[size],
      variantMap[variant]
    )}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
)
