import { PrimaryButton } from "./Shell";
import { MEDS } from "@/journey/data";
import type { Doctor } from "@/journey/types";
import { FileText, Pill, CalendarCheck } from "lucide-react";

export function Summary({ doctor, onNext }: { doctor: Doctor; onNext: () => void }) {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-primary/70">Visit complete</p>
        <h1 className="font-display text-3xl text-balance">Take care of yourself</h1>
        <p className="text-muted-foreground">Here's a gentle summary you can read anytime — even offline.</p>
      </header>

      <div className="stage-card space-y-4 animate-float-in">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <FileText className="h-4 w-4" /> Doctor's notes
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          You have a mild viral infection. Rest, hydrate well, and let your body recover gently. Most people feel better within 4–5 days.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {["Rest", "Warm fluids", "Light meals"].map((t) => (
            <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{t}</span>
          ))}
        </div>
      </div>

      <div className="stage-card space-y-4 animate-float-in" style={{ animationDelay: "120ms" }}>
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Pill className="h-4 w-4" /> Prescribed medication
        </div>
        <div className="space-y-2">
          {MEDS.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2.5">
              <div>
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.schedule}</div>
              </div>
              <span className="text-xs font-medium text-primary">{m.times.length}×/day</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stage-card flex items-center gap-3 animate-float-in" style={{ animationDelay: "240ms" }}>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CalendarCheck className="h-5 w-5" />
        </span>
        <div className="flex-1 text-sm">
          <div className="font-semibold">Follow-up in 7 days</div>
          <div className="text-xs text-muted-foreground">With {doctor.name}</div>
        </div>
      </div>

      <PrimaryButton onClick={onNext}>See my recovery plan →</PrimaryButton>
    </section>
  );
}
