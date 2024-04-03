import { PollChoice } from '../types'

// EIP-3085: wallet_addEthereumChain RPC Method
interface AddEthereumChainParameter {
  chainId: string
  chainName: string
  iconUrls?: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export const CHAINS: Map<bigint, AddEthereumChainParameter> = new Map([
  [
    23294n,
    {
      chainId: '0x5afe',
      chainName: 'Oasis Sapphire',
      iconUrls: ['https://votee.oasis.io/rose.png'],
      nativeCurrency: {
        name: 'ROSE',
        symbol: 'ROSE',
        decimals: 18,
      },
      rpcUrls: ['https://sapphire.oasis.io/', 'wss://sapphire.oasis.io/ws'],
      blockExplorerUrls: ['https://explorer.oasis.io/mainnet/sapphire'],
    },
  ],
  [
    23295n,
    {
      chainId: '0x5aff',
      chainName: 'Oasis Sapphire Testnet',
      iconUrls: ['https://votee.oasis.io/rose.png'],
      nativeCurrency: { name: 'TEST', symbol: 'TEST', decimals: 18 },
      rpcUrls: ['https://testnet.sapphire.oasis.dev/', 'wss://testnet.sapphire.oasis.dev/ws'],
      blockExplorerUrls: ['https://explorer.oasis.io/testnet/sapphire'],
    },
  ],
])

export const NETWORK_NAMES: Record<string, string> = {
  'Oasis Sapphire': 'Sapphire',
  'Oasis Sapphire Testnet': 'Sapphire Testnet',
}

export const MAX_GAS_LIMIT = 150000n

/**
 * This array indexes correspond to the matching choiceId of the poll
 * Desert Owl = 0
 * Capybara = 1
 * Fennec Fox = 2
 */
export const POLL_CHOICES: readonly PollChoice[] = Object.freeze([
  {
    name: 'Capybara',
    description:
      'A friendly capybara with a rose in its hand, symbolizing the interoperability pioneered by the Oasis Network.',
    imagePath: '/cappybara.webp',
  },
  {
    name: 'Desert Owl',
    description:
      'A wise owl with scrolls in its claws, symbolizing the knowledge pioneered by the Oasis Network.',
    imagePath: '/owl.webp',
  },
  {
    name: 'Fennec Fox',
    description:
      'A nimble fox with sunglasses on its eyes, symbolizing the privacy pioneered by the Oasis Network.',
    imagePath: '/fox.webp',
  },
])

export const METAMASK_HOME_PAGE_URL = 'https://metamask.io/'
export const VOTING_LANDING_PAGE_URL = 'https://oasisprotocol.org/oasis-mascot-voting'
export const GITHUB_REPOSITORY_URL = 'https://github.com/oasisprotocol/dapp-votee/'

const {
  VITE_NETWORK: ENV_VITE_NETWORK,
  VITE_PROPOSAL_START_TIME: ENV_VITE_PROPOSAL_START_TIME,
  VITE_WEB3_GATEWAY,
  VITE_CONTRACT_ACL_ALLOWALL,
  VITE_CONTRACT_ACL_NATIVEBALANCE,
  VITE_CONTRACT_POLLMANAGER,
  VITE_CONTRACT_POLLMANAGER_ACL,
  VITE_PROPOSAL_ID,
  VITE_ACL_NATIVEBALANCE_MIN_BALANCE_WEI: ENV_VITE_ACL_NATIVEBALANCE_MIN_BALANCE_WEI,
  VITE_REACT_APP_BUILD_VERSION,
  VITE_REACT_APP_BUILD_DATETIME: ENV_VITE_REACT_APP_BUILD_DATETIME,
} = import.meta.env

const VITE_NETWORK = BigInt(ENV_VITE_NETWORK) ?? 0n
const VITE_ACL_NATIVEBALANCE_MIN_BALANCE_WEI = BigInt(ENV_VITE_ACL_NATIVEBALANCE_MIN_BALANCE_WEI ?? 0) ?? 0n
const VITE_PROPOSAL_START_TIME = Number(ENV_VITE_PROPOSAL_START_TIME) ?? 0
const VITE_REACT_APP_BUILD_DATETIME = Number(ENV_VITE_REACT_APP_BUILD_DATETIME) ?? 0

export {
  VITE_NETWORK,
  VITE_WEB3_GATEWAY,
  VITE_PROPOSAL_START_TIME,
  VITE_CONTRACT_ACL_ALLOWALL,
  VITE_CONTRACT_ACL_NATIVEBALANCE,
  VITE_CONTRACT_POLLMANAGER,
  VITE_CONTRACT_POLLMANAGER_ACL,
  VITE_PROPOSAL_ID,
  VITE_ACL_NATIVEBALANCE_MIN_BALANCE_WEI,
  VITE_REACT_APP_BUILD_VERSION,
  VITE_REACT_APP_BUILD_DATETIME,
}
