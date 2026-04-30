import { useEffect, useState } from "react";
import { PrimaryButton, StickyFooter } from "./Shell";
import { DOCTORS } from "@/journey/data";
import type { Doctor } from "@/journey/types";
import { Star, Clock, Sparkles } from "lucide-react";

export function Doctors({ onPick }: { onPick: (d: Doctor) => void }) {
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setSearching(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-primary/70">Step 2 of 4</p>
          <h1 className="font-display text-3xl leading-tight text-balance">
            We found doctors who can help
          </h1>
          <p className="text-muted-foreground">Matched to your symptoms, sorted by best fit.</p>
        </header>

        {searching ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-calm">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Matching you with the right care…</p>
          </div>
        ) : (
          <div className="space-y-3">
            {DOCTORS.map((d, i) => {
              const active = selected?.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`stage-card w-full animate-float-in text-left transition-all duration-300 ${
                    active ? "ring-2 ring-primary shadow-float -translate-y-0.5" : ""
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-semibold text-primary-foreground"
                      style={{ background: `linear-gradient(135deg, hsl(${d.hue} 50% 45%), hsl(${d.hue} 60% 60%))` }}
                    >
                      {d.initials}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold leading-tight">{d.name}</div>
                          <div className="text-xs text-muted-foreground">{d.specialty} • {d.experience}y exp</div>
                        </div>
                        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-bold text-success">
                          {d.match}% match
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          {d.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {d.nextSlot}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <StickyFooter>
        <PrimaryButton disabled={!selected} onClick={() => selected && onPick(selected)}>
          {selected ? `Choose ${selected.name.split(" ").slice(0, 2).join(" ")}` : "Select a doctor"}
        </PrimaryButton>
      </StickyFooter>
    </>
  );
}
