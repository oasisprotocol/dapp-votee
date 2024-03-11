/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_NETWORK: string
  VITE_WEB3_GATEWAY: string
  VITE_CONTRACT_ACL_ALLOWALL: string
  VITE_CONTRACT_ACL_NATIVEBALANCE: string
  VITE_CONTRACT_POLLMANAGER: string
  VITE_CONTRACT_POLLMANAGER_ACL: string
  VITE_PROPOSAL_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
