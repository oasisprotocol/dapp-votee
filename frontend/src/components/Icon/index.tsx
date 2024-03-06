import { cloneElement, FC, ReactElement, SVGProps } from 'react'

type IconSize = 'medium' | 'large' | 'xlarge'

interface Props {
  children: ReactElement
  size?: IconSize
}

const sizeMap: Record<IconSize, Partial<SVGProps<SVGSVGElement>>> = {
  medium: {
    width: 30,
    height: 30,
  },
  large: {
    width: 64,
    height: 64,
  },
  xlarge: {
    width: 100,
    height: 100,
  },
}

export const Icon: FC<Props> = ({ children, size = 'medium' }) => {
  return cloneElement(children, {
    ...sizeMap[size],
  })
}
