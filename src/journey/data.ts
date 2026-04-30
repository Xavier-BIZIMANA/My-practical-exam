import type { Symptom, Doctor } from "./types";

export const SYMPTOMS: Symptom[] = [
  { id: "headache", label: "Headache", emoji: "🤕", area: "head" },
  { id: "fever", label: "Fever", emoji: "🌡️", area: "body" },
  { id: "cough", label: "Cough", emoji: "😷", area: "chest" },
  { id: "sore-throat", label: "Sore throat", emoji: "🗣️", area: "head" },
  { id: "stomach", label: "Stomach pain", emoji: "🤢", area: "stomach" },
  { id: "fatigue", label: "Tired / weak", emoji: "😴", area: "body" },
  { id: "rash", label: "Skin rash", emoji: "🌿", area: "skin" },
  { id: "anxious", label: "Anxious", emoji: "💭", area: "mind" },
  { id: "breath", label: "Short of breath", emoji: "🫁", area: "chest" },
];

export const DOCTORS: Doctor[] = [
  { id: "d1", name: "Dr. Amara Okafor", specialty: "General Medicine", rating: 4.9, experience: 12, nextSlot: "Today, 4:30 PM", match: 96, initials: "AO", hue: 165 },
  { id: "d2", name: "Dr. Liang Chen", specialty: "Internal Medicine", rating: 4.8, experience: 9, nextSlot: "Tomorrow, 9:00 AM", match: 89, initials: "LC", hue: 195 },
  { id: "d3", name: "Dr. Priya Sharma", specialty: "Family Doctor", rating: 4.9, experience: 15, nextSlot: "Today, 6:15 PM", match: 84, initials: "PS", hue: 24 },
  { id: "d4", name: "Dr. Marco Rossi", specialty: "Pulmonology", rating: 4.7, experience: 18, nextSlot: "Wed, 11:00 AM", match: 78, initials: "MR", hue: 280 },
];

export const SLOTS = [
  { time: "09:00", label: "Morning" },
  { time: "11:30", label: "Late morning" },
  { time: "14:00", label: "Afternoon" },
  { time: "16:30", label: "Evening" },
  { time: "18:15", label: "Late evening" },
];

export const MEDS = [
  { id: "m1", name: "Paracetamol 500mg", schedule: "Every 8 hours", times: ["08:00", "16:00", "00:00"] },
  { id: "m2", name: "Vitamin C 1000mg", schedule: "Once daily", times: ["09:00"] },
  { id: "m3", name: "Hydration salts", schedule: "After meals", times: ["13:00", "20:00"] },
];
