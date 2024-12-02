import {
  atomWithStorage as atomWithStorageJotai,
  createJSONStorage,
} from "jotai/utils";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

function getItem(key: string): string | null {
  const value = storage.getString(key);
  return value ? value : null;
}

function setItem(key: string, value: string): void {
  storage.set(key, value);
}

function removeItem(key: string): void {
  storage.delete(key);
}

function clearAll(): void {
  storage.clearAll();
}

export const atomWithStorage = <T>(key: string, initialValue: T) =>
  atomWithStorageJotai<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    })),
  );
