import { useContext } from 'react'
import { ConfigContext } from '../providers/ConfigContext.ts'

export const useConfig = () => {
  const value = useContext(ConfigContext)
  if (value === undefined) {
    throw new Error('[useConfig] Component not wrapped within a Provider')
  }

  return value
}
