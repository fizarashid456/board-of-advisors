/**
 * ProblemInput.jsx
 *
 * The main input form where the user describes their business problem.
 * Shows a character counter and handles the submit action.
 *
 * Props:
 *   value      {string}   - Current textarea value (controlled)
 *   onChange   {Function} - Called with the new value on each keystroke
 *   onSubmit   {Function} - Called when the user clicks "Convene the Board"
 *   error      {string}   - Optional error message to display (from a previous attempt)
 */

export default function ProblemInput({ value, onChange, onSubmit, error }) {
  const isReady = value.trim().length > 0;

  function handleKeyDown(e) {
    // Allow Cmd+Enter or Ctrl+Enter to submit
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && isReady) {
      onSubmit();
    }
  }

  return (
    <div
      className="fade-up"
      style={{
        background: "#111827",
        border: "1px solid #1e2d3d",
        borderRadius: "14px",
        padding: "28px",
        marginBottom: "24px",
      }}
    >
      {/* Label */}
      <label
        htmlFor="problem-input"
        style={{
          display: "block",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#3d5068",
          marginBottom: "10px",
        }}
      >
        Describe Your Business Problem
      </label>

      {/* Textarea */}
      <textarea
        id="problem-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={5}
        placeholder={
          "e.g. We're a B2B SaaS company with strong product-market fit " +
          "but our churn is 8% monthly. We have $400k runway left and need " +
          "to decide between doubling down on sales or fixing retention first..."
        }
        style={{
          width: "100%",
          background: "#0d1525",
          border: "1px solid #1e2d3d",
          borderRadius: "8px",
          color: "#c8d4e2",
          fontSize: "14px",
          lineHeight: "1.7",
          padding: "14px 16px",
          fontFamily: "inherit",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#2d3f55")}
        onBlur={(e) => (e.target.style.borderColor = "#1e2d3d")}
      />

      {/* Error message */}
      {error && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px 14px",
            background: "#c95f3f15",
            border: "1px solid #c95f3f28",
            borderRadius: "6px",
            color: "#c95f3f",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {/* Footer row — character count + submit button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ color: "#2d3f55", fontSize: "12px" }}>
          {value.length} characters &nbsp;·&nbsp; Cmd+Enter to submit
        </span>

        <button
          onClick={onSubmit}
          disabled={!isReady}
          style={{
            background: isReady ? "#4a7fbd" : "#162032",
            color: isReady ? "#ffffff" : "#2d3f55",
            border: "none",
            borderRadius: "8px",
            padding: "11px 26px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: isReady ? "pointer" : "not-allowed",
            letterSpacing: "0.02em",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
        >
          Convene the Board →
        </button>
      </div>
    </div>
  );
}
