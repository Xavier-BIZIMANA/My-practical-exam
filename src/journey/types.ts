export type StageId =
  | "welcome"
  | "symptoms"
  | "doctors"
  | "booking"
  | "confirmation"
  | "checkin"
  | "waiting"
  | "summary"
  | "followup";

export type Severity = "mild" | "moderate" | "severe";

export interface Symptom {
  id: string;
  label: string;
  emoji: string;
  area: "head" | "chest" | "stomach" | "body" | "skin" | "mind";
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  nextSlot: string;
  match: number;
  initials: string;
  hue: number;
}

export interface Slot {
  time: string;
  label: string;
}

export interface JourneyState {
  stage: StageId;
  symptoms: string[];
  severity: Severity | null;
  duration: string | null;
  doctor: Doctor | null;
  slot: Slot | null;
  date: string | null;
  queuePosition: number;
  visitNotes: string;
  medsTaken: Record<string, boolean>;
}
