// Backend/utils/openai.js  -> Groq-based free AI

const axios = require("axios");

// Groq API key from .env
const API_KEY = process.env.GROQ_API_KEY;

// Groq uses OpenAI-compatible chat endpoint
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

async function getOpenAIAPIResponse(userMessage) {
  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model:  "llama-3.1-8b-instant",
 // free, powerful model
        messages: [
          {
            role: "system",
            content:
              "You are a supportive mental health companion. " +
              "You ONLY talk about feelings, emotions, stress, sadness, anxiety, motivation, and daily life. " +
              "If the user asks technical, coding, maths, exams, GK or news questions, reply with: " +
              "\"I'm here to support your feelings and mental well-being. Let's talk about how you're feeling instead.\" " +
              "Do NOT give medical diagnosis. If user mentions self-harm or emergency, tell them to immediately contact a trusted person or local emergency services."
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content?.trim();
    return reply || "I’m here to listen. Tell me more about how you're feeling.";
  } catch (err) {
    console.error(
      "Groq API Error:",
      err.response?.data || err.message || err.toString()
    );

    return (
      "I’m here to support you emotionally, but I’m having trouble connecting to the AI service right now. " +
      "You can still try writing about how you feel, or reach out to someone you trust."
    );
  }
}

module.exports = getOpenAIAPIResponse;
