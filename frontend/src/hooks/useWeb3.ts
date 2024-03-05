import { useContext } from 'react'
import { Web3Context } from '../providers/Web3Context'

export const useWeb3 = () => {
  const value = useContext(Web3Context)
  if (value === undefined) {
    throw new Error('[useWeb3] Component not wrapped within a Provider')
  }

  return value
}
