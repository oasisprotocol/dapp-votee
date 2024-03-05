export class UnknownNetworkError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export interface EIP1193Error extends Error {
  code: number
}
