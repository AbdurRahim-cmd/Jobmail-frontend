"use client";

import { useEffect, useState } from "react";
import { getHistory } from "@/lib/jdHistory";

export function useJdHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getHistory());
    const sync = () => setItems(getHistory());
    window.addEventListener("jobmail:jdHistory", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("jobmail:jdHistory", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return items;
}
