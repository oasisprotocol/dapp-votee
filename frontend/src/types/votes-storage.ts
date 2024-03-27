import { MascotChoices } from './mascot-choices'

/**
 * Represents a storage for storing previous votes.
 *
 * @typedef {object} VotesStorage
 * @property {string} address - Wallet address
 * @property {MascotChoices} value - ChoiceId
 */
export type VotesStorage = Record<string, MascotChoices>
