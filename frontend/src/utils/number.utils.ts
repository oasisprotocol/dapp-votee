export abstract class NumberUtils {
  // Compatible with https://github.com/MetaMask/metamask-extension/blob/v10.7.0/ui/helpers/utils/icon-factory.js#L84-L88
  static jsNumberForAddress(address: string) {
    const addr = address.slice(2, 10)
    return parseInt(addr, 16)
  }

  static isValidMascotChoiceId(choiceId: number | null) {
    if (choiceId === null) return false

    return Number.isInteger(choiceId) && choiceId >= 0 && choiceId <= 2
  }
}
