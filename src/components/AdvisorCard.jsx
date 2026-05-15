/**
 * AdvisorCard.jsx
 *
 * Displays one advisor's initial position on the problem.
 * Shows their avatar, name, role, full response, key insight, and main concern.
 *
 * Props:
 *   advisor  {Object} - Advisor config object from constants/advisors.js
 *   take     {Object} - Data returned by the API: { id, response, keyInsight, mainConcern }
 */

import Avatar from "./shared/Avatar";
import RoleTag from "./shared/RoleTag";

export default function AdvisorCard({ advisor, take }) {
  return (
    <div
      style={{
        background: "#111827",
        border: `1px solid ${advisor.border}`,
        borderLeft: `3px solid ${advisor.main}`,
        borderRadius: "10px",
        padding: "22px 24px",
        marginBottom: "12px",
      }}
    >
      {/* Card header — avatar, name, title, role tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <Avatar initials={advisor.initials} color={advisor.main} />

        <div style={{ flex: 1, minWidth: "140px" }}>
          <div
            style={{ color: "#e8edf5", fontWeight: 600, fontSize: "15px" }}
          >
            {advisor.name}
          </div>
          <div
            style={{ color: "#4d6480", fontSize: "12px", marginTop: "2px" }}
          >
            {advisor.title}
          </div>
        </div>

        <RoleTag label={advisor.role} color={advisor.main} />
      </div>

      {/* Main response text */}
      <p
        style={{
          color: "#b0bccf",
          fontSize: "14px",
          lineHeight: "1.75",
          margin: "0 0 16px 0",
        }}
      >
        {take.response}
      </p>

      {/* Key insight + main concern chips */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div
          style={{
            flex: 1,
            minWidth: "140px",
            background: advisor.fill,
            border: `1px solid ${advisor.border}`,
            borderRadius: "6px",
            padding: "10px 13px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: advisor.main,
              marginBottom: "4px",
            }}
          >
            Key Insight
          </div>
          <div style={{ fontSize: "12px", color: "#b0bccf" }}>
            {take.keyInsight}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "140px",
            background: "#0d1525",
            border: "1px solid #1e2d3d",
            borderRadius: "6px",
            padding: "10px 13px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3d5068",
              marginBottom: "4px",
            }}
          >
            Main Concern
          </div>
          <div style={{ fontSize: "12px", color: "#b0bccf" }}>
            {take.mainConcern}
          </div>
        </div>
      </div>
    </div>
  );
}
