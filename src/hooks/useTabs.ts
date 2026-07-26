"use client";

import { useState } from "react";

/** Tiny controlled-tab helper shared by the practice tabs and the service tabs. */
export function useTabs<T extends string>(initial: T) {
  const [active, setActive] = useState<T>(initial);
  const isActive = (id: T) => id === active;
  return { active, setActive, isActive };
}
