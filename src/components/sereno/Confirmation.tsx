import { useEffect, useState } from "react";
import { PrimaryButton } from "./Shell";
import { Bell, Calendar, MapPin, Check } from "lucide-react";
import type { Doctor, Slot } from "@/journey/types";

export function Confirmation({ doctor, date, slot, onNext }: { doctor: Doctor; date: string; slot: Slot; onNext: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1400);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <section className="space-y-8 pt-4">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full bg-success/40" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-success shadow-float">
            <svg viewBox="0 0 24 24" className="h-12 w-12">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                fill="none"
                stroke="hsl(var(--success-foreground))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="30"
                strokeDashoffset={step >= 1 ? 0 : 30}
                style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-3xl text-balance">You're all set</h1>
          <p className="text-muted-foreground text-balance">A gentle reminder will arrive 1 hour before.</p>
        </div>
      </div>

      <div className="stage-card space-y-5">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl font-display font-semibold text-primary-foreground"
               style={{ background: `linear-gradient(135deg, hsl(${doctor.hue} 50% 45%), hsl(${doctor.hue} 60% 60%))` }}>
            {doctor.initials}
          </div>
          <div>
            <div className="font-semibold">{doctor.name}</div>
            <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
          </div>
        </div>

        <Detail icon={<Calendar className="h-4 w-4" />} label="When">
          {new Date(date).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })} at {slot.time}
        </Detail>
        <Detail icon={<MapPin className="h-4 w-4" />} label="Where">
          Sereno Care Center, Room 204 · 2nd floor
        </Detail>
        <Detail icon={<Bell className="h-4 w-4" />} label="Reminders">
          1 day before · 1 hour before · check-in time
        </Detail>
      </div>

      <div className="space-y-2.5">
        {[
          "Bring an ID card",
          "Arrive 15 minutes early",
          "Eat lightly before the visit",
        ].map((tip, i) => (
          <div
            key={tip}
            className="flex items-center gap-3 rounded-2xl bg-card/60 px-4 py-3 text-sm animate-float-in"
            style={{ animationDelay: `${600 + i * 120}ms` }}
          >
            <Check className="h-4 w-4 text-success" />
            {tip}
          </div>
        ))}
      </div>

      <PrimaryButton onClick={onNext}>I'm at the hospital →</PrimaryButton>
    </section>
  );
}

function Detail({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-medium">{children}</div>
      </div>
    </div>
  );
}
