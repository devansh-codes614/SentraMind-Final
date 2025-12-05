// Backend/routes/chat.js
const express = require("express");
const Thread = require("../models/thread");
const getOpenAIAPIResponse = require("../utils/openai");
const router = express.Router();

// =====================
// TEST ROUTE
// =====================
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz",
      title: "Testing thread",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in Db" });
  }
});

// =====================
// GET ALL THREADS
// =====================
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 }); // latest first
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// =====================
// GET PARTICULAR THREAD MESSAGES
// =====================
// ❌ pehle /thred tha (typo) – ab /thread kiya
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread Not Found!" });
    }
    return res.json(thread.messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// =====================
// DELETE THREAD
// =====================
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deleteThread = await Thread.findOneAndDelete({ threadId });
    if (!deleteThread) {
      return res
        .status(404)
        .json({ error: "Thread could Not be Deleted!" });
    }
    return res
      .status(200)
      .json({ success: "Thread deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to delete chat" });
  }
});

// =====================
// CHAT ROUTE
// =====================
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  // ✅ yaha return add kiya
  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    // if thread not exist → create new
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      // if exists → push new user message
      thread.messages.push({ role: "user", content: message });
    }

    // assistant reply
    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();

    return res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
