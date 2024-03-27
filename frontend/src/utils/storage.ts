import { StorageKeys } from '../constants/storage-keys'
import { VotesStorage } from '../types'

interface StorageType {
  [StorageKeys.Votes]: VotesStorage
}

export const storage = (storage = localStorage) => {
  const set = <T extends keyof StorageType>(key: T, value: StorageType[T]): void => {
    try {
      const serializedValue = JSON.stringify(value)
      storage.setItem(key, serializedValue)
    } catch (error) {
      // Silently fail, as storage is not a vital part of this dApp(i.e. user has localStorage disabled)
      console.error(error)
    }
  }

  const get = <T extends keyof StorageType>(key: T): StorageType[T] | undefined => {
    try {
      const serializedValue = storage.getItem(key)
      if (!serializedValue) {
        return
      }
      return JSON.parse(serializedValue)
    } catch (error) {
      // Silently fail, as storage is not a vital part of this dApp(i.e. user has localStorage disabled)
      console.error(error)
    }
  }

  const removeItem = (key: StorageKeys) => {
    storage.removeItem(key)
  }

  const clear = () => {
    storage.clear()
  }

  return {
    set,
    get,
    removeItem,
    clear,
  }
}
