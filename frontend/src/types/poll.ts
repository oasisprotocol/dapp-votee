import type { PollManager } from '@oasisprotocol/dapp-voting-backend/src/contracts'

/**
 * Return type of PROPOSALS
 */
export type Poll = [boolean, bigint, PollManager.ProposalParamsStructOutput] & {
  active: boolean
  topChoice: bigint
  params: PollManager.ProposalParamsStructOutput
}
