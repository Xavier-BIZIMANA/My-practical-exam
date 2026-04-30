import { useEffect, useState } from "react";
import { PrimaryButton } from "./Shell";
import { Heart } from "lucide-react";

export function Waiting({ onCalled }: { onCalled: () => void }) {
  const [position, setPosition] = useState(4);
  const [breath, setBreath] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    if (position <= 0) return;
    const t = setTimeout(() => setPosition((p) => p - 1), 4500);
    return () => clearTimeout(t);
  }, [position]);

  useEffect(() => {
    const cycle = ["in", "hold", "out"] as const;
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % 3; setBreath(cycle[i]); }, 4000);
    return () => clearInterval(t);
  }, []);

  const total = 4;
  const eta = Math.max(position * 6, 1);
  const breathLabel = { in: "Breathe in…", hold: "Hold gently", out: "Breathe out…" }[breath];

  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-primary/70">Live · waiting room</p>
        <h1 className="font-display text-3xl text-balance">
          {position === 0 ? "It's your turn" : "You're in line"}
        </h1>
      </header>

      <div className="stage-card flex flex-col items-center gap-5 py-10">
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-44 w-44 -rotate-90">
            <circle cx="60" cy="60" r="52" stroke="hsl(var(--muted))" strokeWidth="6" fill="none" />
            <circle
              cx="60" cy="60" r="52" stroke="url(#g)" strokeWidth="6" fill="none" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (position / total)}
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-display text-6xl font-semibold leading-none text-primary">{position}</div>
            <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
              {position === 0 ? "go in" : position === 1 ? "person ahead" : "ahead of you"}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Estimated wait</div>
          <div className="font-display text-2xl font-semibold">~ {eta} min</div>
        </div>
      </div>

      <div className="stage-card flex flex-col items-center gap-4 bg-gradient-warm">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Heart className="h-4 w-4" /> A moment of calm
        </div>
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-calm text-primary-foreground transition-transform duration-[3800ms] ease-in-out"
          style={{ transform: breath === "in" ? "scale(1.15)" : breath === "hold" ? "scale(1.15)" : "scale(0.85)" }}
        >
          <span className="text-sm font-medium">{breathLabel}</span>
        </div>
        <p className="max-w-xs text-center text-xs text-muted-foreground">
          Follow the circle. Inhale as it grows, exhale as it softens.
        </p>
      </div>

      {position === 0 && <PrimaryButton onClick={onCalled}>Going in →</PrimaryButton>}
      {position > 0 && (
        <button
          onClick={() => setPosition(0)}
          className="w-full rounded-full py-3 text-xs text-muted-foreground hover:text-foreground"
        >
          Demo: skip the wait
        </button>
      )}
    </section>
  );
}
