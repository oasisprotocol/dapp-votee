/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_NETWORK: string
  VITE_WEB3_GATEWAY: string
  VITE_PROPOSAL_START_TIME: string
  VITE_CONTRACT_ACL_ALLOWALL: string
  VITE_CONTRACT_ACL_NATIVEBALANCE: string
  VITE_CONTRACT_POLLMANAGER: string
  VITE_CONTRACT_POLLMANAGER_ACL: string
  VITE_PROPOSAL_ID: string
  VITE_ACL_NATIVEBALANCE_MIN_BALANCE_WEI: string
  VITE_REACT_APP_BUILD_VERSION: string
  VITE_REACT_APP_BUILD_DATETIME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
