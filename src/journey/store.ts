import { useEffect, useState, useCallback } from "react";
import type { JourneyState, StageId } from "./types";

const KEY = "sereno.journey.v1";

const initial: JourneyState = {
  stage: "welcome",
  symptoms: [],
  severity: null,
  duration: null,
  doctor: null,
  slot: null,
  date: null,
  queuePosition: 4,
  visitNotes: "",
  medsTaken: {},
};

function load(): JourneyState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch {}
  return initial;
}

export function useJourney() {
  const [state, setState] = useState<JourneyState>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const update = useCallback((patch: Partial<JourneyState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const goTo = useCallback((stage: StageId) => {
    setState((s) => ({ ...s, stage }));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const reset = useCallback(() => setState(initial), []);

  return { state, update, goTo, reset };
}

export const STAGES: { id: StageId; label: string }[] = [
  { id: "symptoms", label: "Symptoms" },
  { id: "doctors", label: "Doctor" },
  { id: "booking", label: "Booking" },
  { id: "confirmation", label: "Confirm" },
  { id: "checkin", label: "Check-in" },
  { id: "waiting", label: "Waiting" },
  { id: "summary", label: "Summary" },
  { id: "followup", label: "Follow-up" },
];
