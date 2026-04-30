import { useEffect, useState } from "react";
import { PrimaryButton } from "./Shell";
import { QrCode, Navigation, Hospital } from "lucide-react";

export function CheckIn({ onCheckedIn }: { onCheckedIn: () => void }) {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    const t = setTimeout(onCheckedIn, 1800);
    return () => clearTimeout(t);
  }, [scanning, onCheckedIn]);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-primary/70">You've arrived</p>
        <h1 className="font-display text-3xl text-balance">Welcome to Sereno Care</h1>
        <p className="text-muted-foreground">Show this code at the front desk, or tap to check in.</p>
      </header>

      <div className="stage-card flex flex-col items-center gap-5 py-8">
        <div className="relative">
          <div className={`absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-calm transition-all duration-1000 ${scanning ? "animate-shimmer" : ""}`}
               style={{ backgroundSize: "200% 100%" }} />
          <div className="rounded-2xl bg-foreground p-5">
            <QrCode className="h-40 w-40 text-background" strokeWidth={1.2} />
            {scanning && (
              <div className="absolute inset-5 overflow-hidden rounded">
                <div className="h-1 w-full bg-primary-glow shadow-[0_0_20px_hsl(var(--primary-glow))] animate-[slide-up_1.6s_ease-in-out_infinite]" />
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="font-display text-2xl font-semibold tracking-widest">SR-2048</div>
          <div className="text-xs text-muted-foreground">Your appointment code</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoTile icon={<Navigation className="h-5 w-5" />} title="2nd Floor" sub="Take elevator B" />
        <InfoTile icon={<Hospital className="h-5 w-5" />} title="Room 204" sub="Right wing" />
      </div>

      <PrimaryButton onClick={() => setScanning(true)} disabled={scanning}>
        {scanning ? "Checking you in…" : "Check in now"}
      </PrimaryButton>
    </section>
  );
}

function InfoTile({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div className="mt-3 font-display text-lg font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
