/**
 * LoadingState.jsx
 *
 * Shown while the board session is running.
 * Displays the current loading step label and a progress indicator
 * that lights up green as each step completes.
 *
 * Props:
 *   loadingLabel  {string}  - Current step description to show
 *   takesReady    {boolean} - Step 1 complete
 *   debateReady   {boolean} - Step 2 complete
 *   verdictReady  {boolean} - Step 3 complete
 */

import LoadingPulse from "./shared/LoadingPulse";

const STEPS = [
  { key: "takes", label: "Collecting initial positions from all advisors" },
  { key: "debate", label: "Running the debate round" },
  { key: "verdict", label: "Forming the final force-ranked verdict" },
];

export default function LoadingState({
  loadingLabel,
  takesReady,
  debateReady,
  verdictReady,
}) {
  const completionMap = {
    takes: takesReady,
    debate: debateReady,
    verdict: verdictReady,
  };

  return (
    <div
      className="fade-up"
      style={{
        background: "#111827",
        border: "1px solid #1e2d3d",
        borderRadius: "14px",
        padding: "28px",
        marginBottom: "24px",
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#3d5068",
          marginBottom: "18px",
        }}
      >
        Session in Progress
      </div>

      {/* Current step pulse */}
      <LoadingPulse label={loadingLabel || "Initializing..."} />

      {/* Step checklist */}
      <div
        style={{
          marginTop: "18px",
          paddingTop: "18px",
          borderTop: "1px solid #162032",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {STEPS.map((step) => {
          const done = completionMap[step.key];
          return (
            <div
              key={step.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: done ? "#2db87b" : "#1e2d3d",
                  transition: "background 0.4s ease",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: done ? "#2db87b" : "#2d3f55",
                  transition: "color 0.4s ease",
                }}
              >
                {step.label}
                {done && " ✓"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
