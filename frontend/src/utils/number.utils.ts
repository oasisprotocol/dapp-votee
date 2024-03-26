import { MascotChoices } from '../types'

const numPercentageFormat = new Intl.NumberFormat(undefined, {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export abstract class NumberUtils {
  // Compatible with https://github.com/MetaMask/metamask-extension/blob/v10.7.0/ui/helpers/utils/icon-factory.js#L84-L88
  static jsNumberForAddress(address: string) {
    const addr = address.slice(2, 10)
    return parseInt(addr, 16)
  }

  static toNullableInt(from: string | null | undefined): number | null {
    if (from === null || from === undefined) {
      return null
    }

    const int = parseInt(from, 10)

    return Number.isNaN(int) || !Number.isFinite(int) ? null : int
  }

  static isValidMascotChoiceId(choiceId: number | null): choiceId is MascotChoices {
    if (choiceId === null) return false

    return Number.isInteger(choiceId) && choiceId >= 0 && choiceId <= 2
  }

  static toPercentageString(n: number): string {
    return numPercentageFormat.format(n)
  }
}
