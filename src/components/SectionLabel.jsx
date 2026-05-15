/**
 * SectionLabel.jsx
 *
 * A horizontal divider with a centered label — used between the
 * three major sections: Initial Positions, The Debate, Board Verdict.
 */

export default function SectionLabel({ text }) {
  const lineStyle = {
    flex: 1,
    height: "1px",
    background: "#1e2d3d",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        margin: "36px 0 20px",
      }}
    >
      <div style={lineStyle} />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#3d5068",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
      <div style={lineStyle} />
    </div>
  );
}
