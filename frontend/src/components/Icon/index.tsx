import { cloneElement, FC, ReactElement, SVGProps } from 'react'

type IconSize = 'medium'

interface Props {
  children: ReactElement
  size?: IconSize
}

const sizeMap: Record<IconSize, Partial<SVGProps<SVGSVGElement>>> = {
  medium: {
    width: 30,
    height: 30,
  },
}

export const Icon: FC<Props> = ({ children, size = 'medium' }) => {
  return cloneElement(children, {
    ...sizeMap[size],
  })
}
