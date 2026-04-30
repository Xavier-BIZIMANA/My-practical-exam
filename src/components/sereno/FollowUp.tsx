import { useMemo, useState } from "react";
import { PrimaryButton } from "./Shell";
import { MEDS } from "@/journey/data";
import { Bell, Check, Sparkles } from "lucide-react";

interface Props {
  taken: Record<string, boolean>;
  onChange: (next: Record<string, boolean>) => void;
  onRestart: () => void;
}

export function FollowUp({ taken, onChange, onRestart }: Props) {
  const [mood, setMood] = useState<number | null>(null);
  const allDoses = useMemo(() => MEDS.flatMap((m) => m.times.map((t) => ({ med: m, time: t }))).sort((a, b) => a.time.localeCompare(b.time)), []);
  const completed = allDoses.filter((d) => taken[`${d.med.id}-${d.time}`]).length;
  const progress = Math.round((completed / allDoses.length) * 100);

  const toggle = (key: string) => onChange({ ...taken, [key]: !taken[key] });

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-primary/70">Recovery, day 1</p>
        <h1 className="font-display text-3xl text-balance">Small steps, big healing</h1>
      </header>

      <div className="stage-card space-y-3 bg-gradient-warm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Today's doses</span>
          <span className="text-xs font-bold text-primary">{completed}/{allDoses.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-card">
          <div
            className="h-full rounded-full bg-gradient-calm transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <div className="flex items-center gap-2 text-xs font-medium text-success animate-float-in">
            <Sparkles className="h-3.5 w-3.5" /> Wonderful — you've taken everything today.
          </div>
        )}
      </div>

      <div className="space-y-2.5">
        <h2 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
          <Bell className="h-4 w-4" /> Reminders
        </h2>
        {allDoses.map(({ med, time }, i) => {
          const key = `${med.id}-${time}`;
          const done = !!taken[key];
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 active:scale-[0.98] animate-float-in ${
                done ? "border-success/40 bg-success/10" : "border-transparent bg-card shadow-soft"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="font-display text-xl font-semibold tabular-nums w-14">{time}</div>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${done ? "line-through opacity-60" : ""}`}>{med.name}</div>
                <div className="text-xs text-muted-foreground">{med.schedule}</div>
              </div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                done ? "bg-success text-success-foreground" : "border-2 border-border"
              }`}>
                {done && <Check className="h-4 w-4" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="stage-card space-y-3">
        <h2 className="text-sm font-semibold">How are you feeling now?</h2>
        <div className="flex justify-between">
          {["😣", "😕", "😐", "🙂", "😊"].map((e, i) => {
            const active = mood === i;
            return (
              <button
                key={e}
                onClick={() => setMood(i)}
                className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all duration-300 active:scale-90 ${
                  active ? "bg-gradient-calm shadow-glow scale-110" : "bg-secondary"
                }`}
              >
                {e}
              </button>
            );
          })}
        </div>
        {mood !== null && (
          <p className="text-center text-xs text-muted-foreground animate-float-in">
            {mood >= 3 ? "That's wonderful to hear 💚" : "We're here with you. Rest well."}
          </p>
        )}
      </div>

      <PrimaryButton variant="ghost" onClick={onRestart}>Start a new journey</PrimaryButton>
    </section>
  );
}
