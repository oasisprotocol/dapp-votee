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
