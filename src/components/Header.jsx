/**
 * Header.jsx
 *
 * App header with title, subtitle, and the advisor avatar strip.
 * Rendered once at the top of the page — no props needed.
 */

import { ADVISORS } from "../constants/advisors";
import Avatar from "./shared/Avatar";

export default function Header() {
  return (
    <header style={{ textAlign: "center", marginBottom: "48px" }}>
      {/* Eyebrow badge */}
      <div
        style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#4a7fbd",
          background: "#4a7fbd14",
          border: "1px solid #4a7fbd28",
          borderRadius: "20px",
          padding: "5px 16px",
          marginBottom: "20px",
        }}
      >
        AI-Powered Board of Advisors
      </div>

      {/* Main heading */}
      <h1
        style={{
          color: "#e8edf5",
          fontSize: "36px",
          fontWeight: 700,
          margin: "0 0 14px 0",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        Your Boardroom,{" "}
        <span style={{ color: "#4a7fbd" }}>On Demand</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: "#4d6480",
          fontSize: "15px",
          margin: "0 0 32px 0",
          maxWidth: "520px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Describe your business problem. Five expert advisors convene, argue with
        each other, and force-rank what you should do next.
      </p>

      {/* Advisor avatar strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {ADVISORS.map((advisor) => (
          <div
            key={advisor.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Avatar initials={advisor.initials} color={advisor.main} />
            <span style={{ fontSize: "10px", color: "#3d5068", fontWeight: 600 }}>
              {advisor.initials}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
}
