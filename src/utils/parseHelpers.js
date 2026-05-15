export function parseClaudeJSON(raw) {
  let cleaned = raw;

  // Remove markdown fences
  cleaned = cleaned.replace(/```json\s*/gi, "");
  cleaned = cleaned.replace(/```\s*/gi, "");

  // Pull only the JSON object out
  const start = cleaned.indexOf("{");
  const end   = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    console.error("No JSON found in:", raw);
    throw new Error("Model did not return valid JSON.");
  }

  cleaned = cleaned.slice(start, end + 1).trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Parse failed:", cleaned);
    throw new Error("Could not parse model response.");
  }
}

export function formatTakesAsContext(takes) {
  return takes
    .map((t) => `${t.id.toUpperCase()}: ${t.response}`)
    .join("\n\n");
}

export function formatDebateAsContext(exchanges) {
  return exchanges
    .map((e) => `${e.speakerId} → ${e.targetId}: ${e.message}`)
    .join("\n\n");
}