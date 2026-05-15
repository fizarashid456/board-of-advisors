import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

app.post("/api/claude", async (req, res) => {
  const { systemPrompt, userMessage } = req.body;
  const apiKey = process.env.VITE_HUGGINGFACE_API_KEY;

  console.log("📨 Received request with systemPrompt and userMessage");
  console.log("🔑 API Key present:", !!apiKey);

  if (!apiKey) {
    console.error("❌ API key missing - VITE_HUGGINGFACE_API_KEY not set");
    return res.status(500).json({ error: "VITE_HUGGINGFACE_API_KEY not configured" });
  }

  if (!systemPrompt || !userMessage) {
    return res.status(400).json({ error: "Missing systemPrompt or userMessage" });
  }

  try {
    const fullPrompt = `${systemPrompt}\n\n${userMessage}`;

    console.log("🚀 Calling Hugging Face API...");
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 1500,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("❌ HF API error:", response.status, err);
      return res.status(response.status).json({ error: `Hugging Face error: ${err}` });
    }

    const data = await response.json();
    console.log("✅ Hugging Face response received");

    let text;
    if (Array.isArray(data)) {
      text = data[0]?.generated_text;
    } else {
      text = data?.generated_text;
    }

    if (!text) {
      console.error("❌ Empty response from Hugging Face");
      return res.status(500).json({ error: "Empty response from API" });
    }

    // Remove the input prompt from the output
    const result = text.replace(fullPrompt, "").trim();
    console.log("✅ Returning result:", result.substring(0, 50) + "...");
    res.json({ result });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Backend server running on http://localhost:${PORT}\n`);
});
