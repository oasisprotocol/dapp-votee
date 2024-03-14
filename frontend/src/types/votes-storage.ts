import { MascotChoices } from './mascot-choices.ts'

/**
 * Represents a storage for storing previous votes.
 *
 * @typedef {object} VotesStorage
 * @property {string} address - Wallet address
 * @property {MascotChoices} value - ChoiceId
 */
export type VotesStorage = Record<string, MascotChoices>
