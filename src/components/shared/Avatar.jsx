/**
 * Avatar.jsx
 *
 * Circular avatar showing an advisor's initials.
 * Color is driven by the advisor's brand color from the theme.
 */

export default function Avatar({ initials, color }) {
  return (
    <div
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: color + "22",
        border: `1.5px solid ${color}35`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          color: color,
          fontWeight: 700,
          fontSize: "12px",
          letterSpacing: "0.05em",
        }}
      >
        {initials}
      </span>
    </div>
  );
}
