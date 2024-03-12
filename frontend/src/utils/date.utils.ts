import { BigNumberish } from 'ethers'

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  timeStyle: 'long',
  dateStyle: 'long',
})

export abstract class DateUtils {
  static intlDateFormat(date: Date | number) {
    return dateFormat.format(date)
  }

  static unixFormatToDate(unixFormat: BigNumberish) {
    return new Date(Number(unixFormat) * 1000)
  }
}
