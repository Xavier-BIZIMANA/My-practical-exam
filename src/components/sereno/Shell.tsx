import { ReactNode, useEffect, useState } from "react";
import { Wifi, WifiOff, ChevronLeft } from "lucide-react";
import { STAGES } from "@/journey/store";
import type { StageId } from "@/journey/types";

interface Props {
  stage: StageId;
  onBack?: () => void;
  children: ReactNode;
}

export function Shell({ stage, onBack, children }: Props) {
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    const t = setInterval(() => setTime(new Date()), 30_000);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
      clearInterval(t);
    };
  }, []);

  const idx = STAGES.findIndex((s) => s.id === stage);
  const showHeader = stage !== "welcome";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-hero">
      {showHeader && (
        <header className="glass sticky top-0 z-30 border-b border-border/60">
          <div className="flex items-center justify-between px-5 pt-3 pb-2 text-xs font-medium text-muted-foreground">
            <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            <span className="flex items-center gap-1.5">
              {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5 text-warning" />}
              {online ? "Connected" : "Offline — saved locally"}
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 pb-3">
            {onBack && (
              <button
                onClick={onBack}
                aria-label="Back"
                className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div className="flex flex-1 items-center gap-1">
              {STAGES.map((s, i) => (
                <div
                  key={s.id}
                  className="step-dot flex-1"
                  data-state={i < idx ? "done" : i === idx ? "active" : "todo"}
                />
              ))}
            </div>
            <span className="font-display text-sm tracking-tight text-primary">Sereno</span>
          </div>
        </header>
      )}

      <main key={stage} className="flex-1 animate-float-up px-5 pb-32 pt-6">
        {children}
      </main>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost" | "soft";
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-gradient-calm text-primary-foreground shadow-card hover:shadow-float halo",
    ghost: "bg-transparent text-foreground border border-border hover:bg-secondary",
    soft: "bg-secondary text-secondary-foreground hover:bg-muted",
  }[variant];
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export function StickyFooter({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md safe-bottom">
      <div className="glass border-t border-border/60 px-5 pt-3">{children}</div>
    </div>
  );
}
