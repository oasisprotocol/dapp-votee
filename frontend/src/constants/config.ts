interface NetworkConfiguration {
  explorerBaseUrl: string
  networkName: string
}

export const NETWORKS: Map<bigint, NetworkConfiguration> = new Map([
  [
    23294n,
    {
      explorerBaseUrl: 'https://explorer.oasis.io/mainnet/sapphire',
      networkName: 'Sapphire',
    },
  ],
  [
    23295n,
    {
      explorerBaseUrl: 'https://explorer.oasis.io/testnet/sapphire',
      networkName: 'Sapphire Testnet',
    },
  ],
])

export const MAX_GAS_LIMIT = 100000n

interface PollChoice {
  name: string
  description: string
  imagePath: string
}

/**
 * This array indexes correspond to the matching choiceId of the poll
 * Desert Owl = 0
 * Capybara = 1
 * Fennec Fox = 2
 */
export const POLL_CHOICES: readonly PollChoice[] = Object.freeze([
  {
    name: 'Desert Owl',
    description: 'Lorem ipsum dolor sit amet. A repellendus illo.',
    imagePath: 'https://fakeimg.pl/182x175',
  },
  {
    name: 'Capybara',
    description: 'Lorem ipsum dolor sit amet. A repellendus illo.',
    imagePath: 'https://fakeimg.pl/182x175',
  },
  {
    name: 'Fennec Fox',
    description: 'Lorem ipsum dolor sit amet. A repellendus illo.',
    imagePath: 'https://fakeimg.pl/182x175',
  },
])

export const METAMASK_HOME_PAGE = 'https://metamask.io/'

const {
  VITE_NETWORK: ENV_VITE_NETWORK,
  VITE_WEB3_GATEWAY,
  VITE_CONTRACT_ACL_ALLOWALL,
  VITE_CONTRACT_ACL_NATIVEBALANCE,
  VITE_CONTRACT_POLLMANAGER,
  VITE_CONTRACT_POLLMANAGER_ACL,
  VITE_PROPOSAL_ID,
} = import.meta.env

const VITE_NETWORK = BigInt(ENV_VITE_NETWORK) ?? 0n

export {
  VITE_NETWORK,
  VITE_WEB3_GATEWAY,
  VITE_CONTRACT_ACL_ALLOWALL,
  VITE_CONTRACT_ACL_NATIVEBALANCE,
  VITE_CONTRACT_POLLMANAGER,
  VITE_CONTRACT_POLLMANAGER_ACL,
  VITE_PROPOSAL_ID,
}
