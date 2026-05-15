/**
 * App.jsx
 *
 * Root application component.
 * Responsible for layout and rendering only — all business logic
 * lives in the useBoardSession hook.
 */

import { useState } from "react";
import { useBoardSession, SESSION_STATUS } from "./hooks/useBoardSession";
import { ADVISORS } from "./constants/advisors";

import Header from "./components/Header";
import ProblemInput from "./components/ProblemInput";
import LoadingState from "./components/LoadingState";
import AdvisorCard from "./components/AdvisorCard";
import DebateExchange from "./components/DebateExchange";
import FinalVerdict from "./components/FinalVerdict";
import SectionLabel from "./components/SectionLabel";

export default function App() {
  const [problem, setProblem] = useState("");

  const {
    status,
    loadingLabel,
    takes,
    exchanges,
    verdict,
    error,
    startSession,
    resetSession,
  } = useBoardSession();

  function handleSubmit() {
    startSession(problem);
  }

  function handleReset() {
    resetSession();
    setProblem("");
  }

  const isIdle = status === SESSION_STATUS.IDLE || status === SESSION_STATUS.ERROR;
  const isRunning = status === SESSION_STATUS.RUNNING;
  const isDone = status === SESSION_STATUS.DONE;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "48px 20px 100px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <Header />

        {/* ── Input form (hidden once session is done) ── */}
        {isIdle && (
          <ProblemInput
            value={problem}
            onChange={setProblem}
            onSubmit={handleSubmit}
            error={error}
          />
        )}

        {/* ── Loading indicator ── */}
        {isRunning && (
          <LoadingState
            loadingLabel={loadingLabel}
            takesReady={takes.length > 0}
            debateReady={exchanges.length > 0}
            verdictReady={!!verdict}
          />
        )}

        {/* ── Problem recap (visible during and after the session) ── */}
        {(isRunning || isDone) && problem && (
          <div
            className="fade-up"
            style={{
              padding: "14px 18px",
              background: "#0d1525",
              border: "1px solid #162032",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#2d3f55",
                marginBottom: "6px",
              }}
            >
              Problem on the Table
            </div>
            <p style={{ color: "#5a7290", fontSize: "13px", margin: 0, lineHeight: 1.65 }}>
              {problem}
            </p>
          </div>
        )}

        {/* ── Initial positions ── */}
        {takes.length > 0 && (
          <div className="fade-up">
            <SectionLabel text="Initial Positions" />
            {takes.map((take) => {
              const advisor = ADVISORS.find((a) => a.id === take.id);
              return advisor ? (
                <AdvisorCard key={take.id} advisor={advisor} take={take} />
              ) : null;
            })}
          </div>
        )}

        {/* ── Debate round ── */}
        {exchanges.length > 0 && (
          <div className="fade-up">
            <SectionLabel text="The Debate" />
            {exchanges.map((exchange, i) => (
              <DebateExchange key={i} exchange={exchange} />
            ))}
          </div>
        )}

        {/* ── Final verdict ── */}
        {verdict && (
          <div className="fade-up">
            <SectionLabel text="Board Verdict" />
            <FinalVerdict verdict={verdict} />
          </div>
        )}

        {/* ── Reset button (shown after session completes) ── */}
        {isDone && (
          <div
            className="fade-up"
            style={{ textAlign: "center", marginTop: "48px" }}
          >
            <button
              onClick={handleReset}
              style={{
                background: "transparent",
                color: "#3d5068",
                border: "1px solid #1e2d3d",
                borderRadius: "8px",
                padding: "11px 28px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#7d93b0";
                e.target.style.borderColor = "#2d3f55";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#3d5068";
                e.target.style.borderColor = "#1e2d3d";
              }}
            >
              ← Start a New Session
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
