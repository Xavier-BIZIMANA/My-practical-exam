import { useState } from "react";
import { PrimaryButton, StickyFooter } from "./Shell";
import { SYMPTOMS } from "@/journey/data";
import type { Severity } from "@/journey/types";

interface Props {
  initial: { symptoms: string[]; severity: Severity | null; duration: string | null };
  onNext: (data: { symptoms: string[]; severity: Severity; duration: string }) => void;
}

const DURATIONS = ["Today", "1–2 days", "A week", "Longer"];
const SEVERITIES: { id: Severity; label: string; emoji: string; tone: string }[] = [
  { id: "mild", label: "Manageable", emoji: "🙂", tone: "from-success/20 to-success/5" },
  { id: "moderate", label: "Bothering me", emoji: "😐", tone: "from-warning/30 to-warning/5" },
  { id: "severe", label: "Hard to bear", emoji: "😟", tone: "from-destructive/30 to-destructive/5" },
];

export function Symptoms({ initial, onNext }: Props) {
  const [picked, setPicked] = useState<string[]>(initial.symptoms);
  const [severity, setSeverity] = useState<Severity | null>(initial.severity);
  const [duration, setDuration] = useState<string | null>(initial.duration);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const ready = picked.length > 0 && severity && duration;

  return (
    <>
      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-primary/70">Step 1 of 4</p>
          <h1 className="font-display text-3xl leading-tight text-balance">
            What's troubling you today?
          </h1>
          <p className="text-muted-foreground">Tap anything you feel. You can pick more than one.</p>
        </header>

        <div className="flex flex-wrap gap-2.5">
          {SYMPTOMS.map((s, i) => {
            const active = picked.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                data-active={active}
                className="chip animate-float-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="text-lg leading-none">{s.emoji}</span>
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground/80">How strong is the feeling?</h2>
          <div className="grid grid-cols-3 gap-2">
            {SEVERITIES.map((s) => {
              const active = severity === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSeverity(s.id)}
                  className={`group flex flex-col items-center gap-2 rounded-2xl border-2 bg-gradient-to-br ${s.tone} p-4 transition-all duration-300 active:scale-95 ${
                    active ? "border-primary shadow-glow" : "border-transparent"
                  }`}
                >
                  <span className="text-3xl transition-transform duration-300 group-active:scale-110">
                    {s.emoji}
                  </span>
                  <span className="text-xs font-semibold">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground/80">Since when?</h2>
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((d) => {
              const active = duration === d;
              return (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  data-active={active}
                  className="chip justify-center"
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <StickyFooter>
        <PrimaryButton
          disabled={!ready}
          onClick={() => ready && onNext({ symptoms: picked, severity: severity!, duration: duration! })}
        >
          {ready ? "Find a doctor →" : `Pick ${picked.length === 0 ? "a symptom" : !severity ? "severity" : "duration"}`}
        </PrimaryButton>
      </StickyFooter>
    </>
  );
}
