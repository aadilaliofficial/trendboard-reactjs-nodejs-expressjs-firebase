// server.js (root)
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // backend safe env
});

// API route: summarize
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes news articles clearly and concisely.",
        },
        {
          role: "user",
          content: `Summarize this news article in 3-4 lines:\n\n${text}`,
        },
      ],
    });

    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ error: "Summarization failed" });
  }
});

app.listen(5000, () => console.log("✅ Backend running at http://localhost:5000"));
