import { useEffect } from "react";
import { useJourney } from "@/journey/store";
import { Shell } from "@/components/sereno/Shell";
import { Welcome } from "@/components/sereno/Welcome";
import { Symptoms } from "@/components/sereno/Symptoms";
import { Doctors } from "@/components/sereno/Doctors";
import { Booking } from "@/components/sereno/Booking";
import { Confirmation } from "@/components/sereno/Confirmation";
import { CheckIn } from "@/components/sereno/CheckIn";
import { Waiting } from "@/components/sereno/Waiting";
import { Summary } from "@/components/sereno/Summary";
import { FollowUp } from "@/components/sereno/FollowUp";
import type { StageId } from "@/journey/types";

const ORDER: StageId[] = [
  "welcome", "symptoms", "doctors", "booking", "confirmation", "checkin", "waiting", "summary", "followup",
];

const Index = () => {
  const { state, update, goTo, reset } = useJourney();

  // Soft online/offline toast via title swap
  useEffect(() => {
    document.title = "Sereno — Calm Care, From Symptom to Recovery";
  }, []);

  const back = () => {
    const i = ORDER.indexOf(state.stage);
    if (i > 0) goTo(ORDER[i - 1]);
  };

  const showBack = state.stage !== "welcome" && state.stage !== "followup" && state.stage !== "waiting";

  return (
    <Shell stage={state.stage} onBack={showBack ? back : undefined}>
      {state.stage === "welcome" && <Welcome onStart={() => goTo("symptoms")} />}

      {state.stage === "symptoms" && (
        <Symptoms
          initial={{ symptoms: state.symptoms, severity: state.severity, duration: state.duration }}
          onNext={(d) => { update(d); goTo("doctors"); }}
        />
      )}

      {state.stage === "doctors" && (
        <Doctors onPick={(doctor) => { update({ doctor }); goTo("booking"); }} />
      )}

      {state.stage === "booking" && state.doctor && (
        <Booking
          doctor={state.doctor}
          onConfirm={(date, slot) => { update({ date, slot }); goTo("confirmation"); }}
        />
      )}

      {state.stage === "confirmation" && state.doctor && state.slot && state.date && (
        <Confirmation
          doctor={state.doctor}
          date={state.date}
          slot={state.slot}
          onNext={() => goTo("checkin")}
        />
      )}

      {state.stage === "checkin" && <CheckIn onCheckedIn={() => goTo("waiting")} />}

      {state.stage === "waiting" && <Waiting onCalled={() => goTo("summary")} />}

      {state.stage === "summary" && state.doctor && (
        <Summary doctor={state.doctor} onNext={() => goTo("followup")} />
      )}

      {state.stage === "followup" && (
        <FollowUp
          taken={state.medsTaken}
          onChange={(medsTaken) => update({ medsTaken })}
          onRestart={() => { reset(); }}
        />
      )}
    </Shell>
  );
};

export default Index;
