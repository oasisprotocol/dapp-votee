import classes from './index.module.css'
import { FC } from 'react'
import { JazzIcon } from '../JazzIcon'
import { useWeb3 } from '../../hooks/useWeb3'
import { StringUtils } from '../../utils/string.utils.ts'

interface Props {
  address: string
  chainName: string
}

export const ConnectedAccount: FC<Props> = ({ address, chainName }) => {
  const {
    state: { explorerBaseUrl },
  } = useWeb3()

  const url = explorerBaseUrl ? StringUtils.getAccountUrl(explorerBaseUrl, address) : undefined

  return (
    <a href={url} className={classes.connectedAccount} target="_blank" rel="nofollow noreferrer">
      <JazzIcon size={30} address={address} />
      <p className={classes.connectedAccountDetails}>
        <span className={classes.network}>{chainName}</span>
        <abbr title={address} className={classes.connectedAccountAddress}>
          {StringUtils.truncateAddress(address)}
        </abbr>
      </p>
    </a>
  )
}
