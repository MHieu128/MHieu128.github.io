import express from "express";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

app.use(express.json());

// ── Static files with caching ──
const distPath = resolve(__dirname, "dist");
app.use(
  express.static(distPath, {
    maxAge: "1y",
    immutable: true,
    index: false,
  }),
);

// serve index.html without aggressive caching
app.get("/", (_req, res) => {
  res.sendFile(resolve(distPath, "index.html"));
});

// ── Telegram contact endpoint ──
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars");
    return res.status(500).json({ error: "Server misconfigured." });
  }

  const text = [
    "📩 *New Contact Message*",
    "",
    `👤 *Name:* ${escapeMarkdown(name)}`,
    `📧 *Email:* ${escapeMarkdown(email)}`,
    "",
    `💬 *Message:*`,
    escapeMarkdown(message),
    "",
    `🕐 _${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}_`,
  ].join("\n");

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      },
    );

    const data = await tgRes.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return res.status(502).json({ error: "Failed to send message." });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Telegram request failed:", err);
    return res.status(502).json({ error: "Failed to send message." });
  }
});

// ── SPA / Astro static fallback ──
app.get("/{*path}", (_req, res) => {
  res.sendFile(resolve(distPath, "404.html"));
});

// ── Helpers ──
function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn(
      "⚠️  TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — contact form will not work",
    );
  }
});
