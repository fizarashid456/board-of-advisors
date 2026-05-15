/**
 * claudeApi.js
 * Provider: OpenRouter API
 * Model: Claude 3 Haiku (fast, reliable, widely available)
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callClaude(systemPrompt, userMessage) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_OPENROUTER_API_KEY not found in .env file.");
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Board of Advisors",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("OpenRouter Error Response:", err);
    throw new Error(`OpenRouter error ${response.status}: ${err.error?.message || JSON.stringify(err)}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;

  console.log("RAW RESPONSE:", text);

  if (!text) throw new Error("OpenRouter returned empty response.");
  return text;
}