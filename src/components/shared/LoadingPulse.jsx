/**
 * LoadingPulse.jsx
 *
 * Animated dot with a label — used to show the current loading step.
 */

export default function LoadingPulse({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 0",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#4a7fbd",
          animation: "pulse 1.2s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      <span style={{ color: "#7d93b0", fontSize: "14px" }}>{label}</span>
    </div>
  );
}
