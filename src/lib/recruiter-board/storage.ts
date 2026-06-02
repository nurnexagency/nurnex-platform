import type { RecruiterBoardData } from "./types";
import { emptyBoard } from "./types";

const prefix = "nurnex-recruiter-board:";

export function boardStorageKey(userId: string) {
  return `${prefix}${userId}`;
}

export function loadBoard(userId: string): RecruiterBoardData {
  if (typeof window === "undefined") return emptyBoard();
  try {
    const raw = localStorage.getItem(boardStorageKey(userId));
    if (!raw) return emptyBoard();
    const parsed = JSON.parse(raw) as RecruiterBoardData;
    return {
      ...emptyBoard(),
      ...parsed,
      members: parsed.members ?? [],
      assignments: parsed.assignments ?? [],
      metrics: parsed.metrics ?? { hires: 0, interviews: 0, feesPaid: 0 },
      comments: parsed.comments ?? [],
    };
  } catch {
    return emptyBoard();
  }
}

export function saveBoard(userId: string, data: RecruiterBoardData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(boardStorageKey(userId), JSON.stringify(data));
}
