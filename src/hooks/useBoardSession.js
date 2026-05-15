/**
 * useBoardSession.js
 *
 * Custom hook that manages the entire board session lifecycle.
 * All API calls, state transitions, and error handling live here.
 *
 * This keeps App.jsx clean — it only handles layout and rendering,
 * while this hook owns all the "how does this thing actually work" logic.
 *
 * Session flow:
 *   idle → running (takes) → running (debate) → running (verdict) → done
 *                                                                  ↘ error
 */

import { useState } from "react";
import { callClaude } from "../services/claudeApi";
import {
  promptInitialTakes,
  promptDebate,
  promptVerdict,
} from "../prompts/boardPrompts";
import {
  parseClaudeJSON,
  formatTakesAsContext,
  formatDebateAsContext,
} from "../utils/parseHelpers";

// Possible values for the `status` state field
export const SESSION_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  DONE: "done",
  ERROR: "error",
};

export function useBoardSession() {
  const [status, setStatus] = useState(SESSION_STATUS.IDLE);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [takes, setTakes] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [verdict, setVerdict] = useState(null);
  const [error, setError] = useState("");

  async function startSession(problem) {
    if (!problem.trim() || status === SESSION_STATUS.RUNNING) return;

    // Reset everything before starting a fresh session
    setStatus(SESSION_STATUS.RUNNING);
    setError("");
    setTakes([]);
    setExchanges([]);
    setVerdict(null);

    try {
      // ── Step 1: Collect each advisor's initial position ──────────────────
      setLoadingLabel("Convening the board...");
      const rawTakes = await callClaude(
        promptInitialTakes(),
        `Business problem: "${problem}"`
      );
      const parsedTakes = parseClaudeJSON(rawTakes).takes;
      setTakes(parsedTakes);

      // ── Step 2: Run the debate round ─────────────────────────────────────
      setLoadingLabel("Debate in progress...");
      const takesContext = formatTakesAsContext(parsedTakes);
      const rawDebate = await callClaude(
        promptDebate(),
        `Problem: "${problem}"\n\nInitial positions:\n${takesContext}`
      );
      const parsedExchanges = parseClaudeJSON(rawDebate).exchanges;
      setExchanges(parsedExchanges);

      // ── Step 3: Produce the force-ranked verdict ─────────────────────────
      setLoadingLabel("Board reaching a verdict...");
      const debateContext = formatDebateAsContext(parsedExchanges);
      const rawVerdict = await callClaude(
        promptVerdict(),
        `Problem: "${problem}"\n\nDebate:\n${debateContext}`
      );
      const parsedVerdict = parseClaudeJSON(rawVerdict);
      setVerdict(parsedVerdict);

      setStatus(SESSION_STATUS.DONE);
    } catch (err) {
      console.error("Board session failed:", err);
      setError(
        "Something went wrong running the board session. Please check your connection and try again."
      );
      setStatus(SESSION_STATUS.ERROR);
    }
  }

  function resetSession() {
    setStatus(SESSION_STATUS.IDLE);
    setLoadingLabel("");
    setTakes([]);
    setExchanges([]);
    setVerdict(null);
    setError("");
  }

  return {
    status,
    loadingLabel,
    takes,
    exchanges,
    verdict,
    error,
    startSession,
    resetSession,
  };
}
