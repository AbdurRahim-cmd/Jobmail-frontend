const KEY = "jobmail.jdHistory.v1";
const MAX_ITEMS = 20;

function safeRead() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function safeWrite(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("jobmail:jdHistory"));
  } catch {
    /* quota — ignore */
  }
}

export function getHistory() {
  return safeRead();
}

export function addHistoryEntry({ jd, actionId, label, company }) {
  if (!jd || jd.trim().length < 30) return;
  const items = safeRead();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    jd,
    actionId,
    label,
    company: company || null,
    createdAt: Date.now(),
  };
  const next = [entry, ...items.filter((i) => i.jd !== jd)].slice(0, MAX_ITEMS);
  safeWrite(next);
  return entry;
}

export function removeHistoryEntry(id) {
  safeWrite(safeRead().filter((i) => i.id !== id));
}

export function clearHistory() {
  safeWrite([]);
}
