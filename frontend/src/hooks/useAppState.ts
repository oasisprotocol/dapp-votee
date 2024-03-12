import { useContext } from 'react'
import { AppStateContext } from '../providers/AppStateContext.ts'

export const useAppState = () => {
  const value = useContext(AppStateContext)
  if (value === undefined) {
    throw new Error('[useAppState] Component not wrapped within a Provider')
  }

  return value
}
