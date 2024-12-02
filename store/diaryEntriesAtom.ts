import { atom } from "jotai";
import { useMemo } from "react";

import type { DiaryEntry } from "@/domain/DiaryEntry";
import { fakeDiaryEntries } from "@/utils/fakeDiaryEntries";

import { atomWithStorage } from "./atomWithStorage";

export const diaryEntriesAtom = atomWithStorage<DiaryEntry[]>(
  "diaryEntries",
  fakeDiaryEntries,
);

const createEntryAtom = (id: string) =>
  atom(
    (get) => {
      const entries = get(diaryEntriesAtom);
      return entries.find((entry) => entry.id === id);
    },
    (get, set, updatedEntry: Partial<DiaryEntry>) => {
      const entries = get(diaryEntriesAtom);
      const newEntries = entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry,
      );
      set(diaryEntriesAtom, newEntries);
    },
  );

export const useCreateDiaryEntryAtom = (id: string) =>
  useMemo(() => createEntryAtom(id), [id]);
