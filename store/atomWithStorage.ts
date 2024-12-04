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
    createJSONStorage<T>(
      () => ({
        getItem,
        setItem,
        removeItem,
        clearAll,
      }),
      { reviver: reviverWithDateParsing },
    ),
  );

/**
 * Reviver function for JSON parsing that handles date conversion
 * Converts string dates back to Date objects for objects with a createdAt property
 * @param {unknown} value The value being parsed
 * @returns {unknown} The value with dates converted if applicable
 */
const reviverWithDateParsing = (value: unknown): unknown => {
  if (
    value &&
    typeof value === "object" &&
    "createdAt" in value &&
    typeof value.createdAt === "string"
  ) {
    return { ...value, createdAt: new Date(value.createdAt) };
  }
  return value;
};
