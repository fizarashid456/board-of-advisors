/**
 * RoleTag.jsx
 *
 * Small pill badge showing an advisor's role label.
 * Used inside AdvisorCard and DebateExchange headers.
 */

export default function RoleTag({ label, color }) {
  return (
    <span
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: color,
        background: color + "20",
        border: `1px solid ${color}30`,
        padding: "3px 9px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
