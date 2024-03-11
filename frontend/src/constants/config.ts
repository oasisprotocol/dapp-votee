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
