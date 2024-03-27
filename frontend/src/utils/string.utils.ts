import { NETWORK_NAMES } from '../constants/config'

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

export abstract class StringUtils {
  static truncateAddress = (address: string) => {
    const matches = address.match(truncateRegex)
    if (!matches || matches?.length <= 0) return address

    const [, start, end] = matches
    return `${start}\u2026${end}`
  }

  static getTransactionUrl = (baseUrl: string, txHash: string) => `${baseUrl}/tx/${txHash}`

  static getAccountUrl = (baseUrl: string, address: string) => `${baseUrl}/address/${address}`

  static clsx = (...classNames: (string | undefined)[]) => {
    return classNames
      .map(className => (className ? [className] : []))
      .flat()
      .join(' ')
  }

  static getNetworkFriendlyName = (chainName: string) => {
    return NETWORK_NAMES[chainName] ?? 'Unknown network'
  }

  static truncate = (s: string, sliceIndex = 200) => {
    return s.slice(0, sliceIndex)
  }
}
