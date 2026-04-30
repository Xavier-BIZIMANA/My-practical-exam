import { useState } from "react";
import { PrimaryButton, StickyFooter } from "./Shell";
import { SLOTS } from "@/journey/data";
import type { Doctor, Slot } from "@/journey/types";

export function Booking({ doctor, onConfirm }: { doctor: Doctor; onConfirm: (date: string, slot: Slot) => void }) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  const [date, setDate] = useState(days[0].toDateString());
  const [slot, setSlot] = useState<Slot | null>(null);

  return (
    <>
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-primary/70">Step 3 of 4</p>
          <h1 className="font-display text-3xl leading-tight text-balance">When works for you?</h1>
          <p className="text-muted-foreground">Booking with <span className="font-semibold text-foreground">{doctor.name}</span></p>
        </header>

        <div className="-mx-5 overflow-x-auto px-5">
          <div className="flex gap-2 pb-1">
            {days.map((d, i) => {
              const key = d.toDateString();
              const active = date === key;
              return (
                <button
                  key={key}
                  onClick={() => setDate(key)}
                  className={`flex min-w-[64px] flex-col items-center gap-1 rounded-2xl border-2 px-3 py-3 transition-all duration-300 active:scale-95 ${
                    active ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-transparent bg-card text-foreground"
                  }`}
                >
                  <span className="text-[11px] font-medium uppercase opacity-70">
                    {i === 0 ? "Today" : d.toLocaleDateString([], { weekday: "short" })}
                  </span>
                  <span className="font-display text-xl font-semibold">{d.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground/80">Available times</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {SLOTS.map((s, i) => {
              const taken = i === 1;
              const active = slot?.time === s.time;
              return (
                <button
                  key={s.time}
                  disabled={taken}
                  onClick={() => setSlot(s)}
                  className={`flex flex-col items-start gap-0.5 rounded-2xl border-2 p-4 text-left transition-all duration-300 active:scale-95 ${
                    taken
                      ? "border-transparent bg-muted opacity-40"
                      : active
                      ? "border-primary bg-primary text-primary-foreground shadow-glow"
                      : "border-transparent bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="font-display text-xl font-semibold">{s.time}</span>
                  <span className="text-xs opacity-70">{taken ? "Booked" : s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-4 text-sm text-muted-foreground">
          💚 Free cancellation until 2 hours before your visit.
        </div>
      </section>

      <StickyFooter>
        <PrimaryButton disabled={!slot} onClick={() => slot && onConfirm(date, slot)}>
          {slot ? `Confirm ${slot.time}` : "Pick a time"}
        </PrimaryButton>
      </StickyFooter>
    </>
  );
}
