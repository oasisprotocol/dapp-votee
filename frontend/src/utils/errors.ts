import { CallExceptionError, EthersError } from 'ethers'

const NETWORK_ERROR_MESSAGE = 'Unable to connect to RPC node! Please check your internet connection.'

export class UnknownNetworkError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class UpcomingPollError extends Error {
  constructor(message = '') {
    super(message)
  }
}

export interface EIP1193Error extends Error {
  code: number
}

export const handleKnownErrors = (error: Error): void => {
  const errorMessage = (error?.message ?? '').toLowerCase()

  switch (errorMessage) {
    case 'failed to fetch':
      throw new Error(NETWORK_ERROR_MESSAGE)
  }
}

export const handleKnownContractCallExceptionErrors = <T = unknown>(
  callExceptionError: CallExceptionError,
  defaultReturn: Promise<T>
) => {
  const reason = callExceptionError?.reason ?? ''

  switch (reason) {
    // Contract call reverted
    case 'require(false)': {
      return defaultReturn
    }
  }
}

export const handleKnownEthersErrors = (error: EthersError) => {
  const errorCode = error?.code ?? ''

  switch (errorCode) {
    case 'ACTION_REJECTED':
      throw new Error('User rejected action, please try again.')
    case 'NETWORK_ERROR':
    case 'TIMEOUT':
      throw new Error(NETWORK_ERROR_MESSAGE)
  }
  // Default to short message
  throw new Error(error.shortMessage)
}

export const toErrorString = (error: Error = new Error('Unknown error')) => {
  let errorString = ''

  if (Object.prototype.hasOwnProperty.call(error, 'message')) {
    errorString = (error as Error).message
  } else if (typeof error === 'object') {
    errorString = JSON.stringify(errorString)
  } else {
    errorString = error
  }

  return errorString
}
