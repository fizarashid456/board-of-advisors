/**
 * DebateExchange.jsx
 *
 * Renders one debate exchange — one advisor pushing back on another.
 * Shows who is speaking, who they're targeting, and the argument text.
 *
 * Props:
 *   exchange {Object} - { speakerId, targetId, message }
 */

import { getAdvisorById } from "../constants/advisors";

export default function DebateExchange({ exchange }) {
  const speaker = getAdvisorById(exchange.speakerId);
  const target = getAdvisorById(exchange.targetId);

  // Shouldn't happen with valid API data, but guard just in case
  if (!speaker || !target) return null;

  return (
    <div
      style={{
        background: "#0d1525",
        border: "1px solid #162032",
        borderRadius: "8px",
        padding: "15px 18px",
        marginBottom: "8px",
      }}
    >
      {/* Speaker → Target header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: speaker.main,
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          {speaker.name}
        </span>

        <span style={{ color: "#243040", fontSize: "12px" }}>
          → pushes back on
        </span>

        <span
          style={{
            color: target.main,
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          {target.name}
        </span>
      </div>

      {/* Argument text */}
      <p
        style={{
          color: "#8da3bb",
          fontSize: "13.5px",
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        {exchange.message}
      </p>
    </div>
  );
}
