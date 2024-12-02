import type { DiaryEntry } from "@/domain/DiaryEntry";
import { fakeDiaryEntries } from "@/utils/fakeDiaryEntries";

import { atomWithStorage } from "./atomWithStorage";

export const diaryEntriesAtom = atomWithStorage<DiaryEntry[]>(
  "diaryEntries",
  fakeDiaryEntries,
);
