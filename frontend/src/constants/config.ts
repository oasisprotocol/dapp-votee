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

export const MAX_GAS_LIMIT = 150000n

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
    description:
      'A wise owl with scrolls in its claws, symbolizing the knowledge pioneered by the Oasis Network.',
    imagePath: 'https://fakeimg.pl/182x182',
  },
  {
    name: 'Capybara',
    description:
      'A friendly capybara with a rose on its head, symbolizing the interoperability pioneered by the Oasis Network.',
    imagePath: 'https://fakeimg.pl/182x182',
  },
  {
    name: 'Fennec Fox',
    description:
      'A nimble fox with sunglasses on its eyes, symbolizing the integrity pioneered by the Oasis Network.',
    imagePath: 'https://fakeimg.pl/182x182',
  },
])

export const METAMASK_HOME_PAGE = 'https://metamask.io/'
