import { PrimaryButton } from "./Shell";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";

export function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between px-6 pb-10 pt-16 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-glow" />

      <div className="flex flex-col items-center gap-4">
        <div className="font-display text-2xl tracking-tight text-primary">Sereno</div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">Calm care, every step</span>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30" />
          <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/20" style={{ animationDelay: "0.8s" }} />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-calm shadow-float breathe">
            <Heart className="h-12 w-12 text-primary-foreground" strokeWidth={1.5} fill="currentColor" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-4xl leading-[1.05] text-balance">
            How are you<br />feeling today?
          </h1>
          <p className="text-balance text-base text-muted-foreground">
            We'll guide you gently from symptom to recovery — one calm step at a time.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2.5 text-left">
          <Feature icon={<Sparkles className="h-4 w-4" />} text="Smart doctor matching" />
          <Feature icon={<ShieldCheck className="h-4 w-4" />} text="Works offline — saved locally" />
          <Feature icon={<Heart className="h-4 w-4" />} text="Gentle reminders, not alarms" />
        </div>
      </div>

      <div className="w-full space-y-3">
        <PrimaryButton onClick={onStart}>Begin my care journey</PrimaryButton>
        <p className="text-xs text-muted-foreground">Takes about 2 minutes • No account needed</p>
      </div>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card/70 px-4 py-3 shadow-soft">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
