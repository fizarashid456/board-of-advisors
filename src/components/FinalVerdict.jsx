/**
 * FinalVerdict.jsx
 *
 * Renders the board's final output — a summary paragraph and
 * three force-ranked action items, each attributed to a champion advisor.
 *
 * Props:
 *   verdict {Object} - { summary, recommendations: [{ rank, action, champion, rationale }] }
 */

import { getAdvisorById } from "../constants/advisors";

const RANK_ICONS = ["🥇", "🥈", "🥉"];

function RecommendationRow({ rec, index }) {
  const champion = getAdvisorById(rec.champion);
  const isTopRanked = index === 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        background: isTopRanked ? "#162032" : "#0d1525",
        border: isTopRanked ? "1px solid #2d3f55" : "1px solid #141e2c",
        borderRadius: "8px",
        padding: "16px 18px",
        marginBottom: "8px",
      }}
    >
      {/* Rank medal */}
      <span style={{ fontSize: "20px", flexShrink: 0, lineHeight: 1, marginTop: "1px" }}>
        {RANK_ICONS[index] ?? `#${index + 1}`}
      </span>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#e8edf5",
            fontWeight: 600,
            fontSize: "14px",
            marginBottom: "6px",
          }}
        >
          {rec.action}
        </div>

        <div
          style={{
            color: "#4d6480",
            fontSize: "13px",
            lineHeight: "1.6",
            marginBottom: champion ? "8px" : 0,
          }}
        >
          {rec.rationale}
        </div>

        {champion && (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: champion.main,
            }}
          >
            ↑ Championed by {champion.name}
          </span>
        )}
      </div>
    </div>
  );
}

export default function FinalVerdict({ verdict }) {
  return (
    <div>
      {/* Board summary block */}
      <div
        style={{
          background: "#4a7fbd10",
          border: "1px solid #4a7fbd25",
          borderRadius: "10px",
          padding: "20px 24px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4a7fbd",
            marginBottom: "8px",
          }}
        >
          Board Summary
        </div>
        <p
          style={{
            color: "#b0bccf",
            fontSize: "14px",
            lineHeight: "1.75",
            margin: 0,
          }}
        >
          {verdict.summary}
        </p>
      </div>

      {/* Ranked action items */}
      {verdict.recommendations.map((rec, i) => (
        <RecommendationRow key={rec.rank} rec={rec} index={i} />
      ))}
    </div>
  );
}
