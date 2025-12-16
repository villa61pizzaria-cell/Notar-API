import express from "express";
import axios from "axios";

const app = express();
app.use(express.json({ limit: "50mb" }));

// Rota de teste
app.get("/", (req, res) => res.send("Notar API rodando."));

// Webhook da Z-API
app.post("/webhook", async (req, res) => {
  try {
    const message =
      req.body?.text?.message ||
      req.body?.message?.text ||
      "Mensagem recebida";

    const phone =
      req.body?.phone ||
      req.body?.from ||
      req.body?.chatId;

    if (!phone) {
      return res.status(200).json({ ok: true });
    }

    await axios.post(
      `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE_ID}/token/${process.env.ZAPI_TOKEN}/send-text`,
      {
        phone,
        message: "Olá! Recebi sua mensagem 😊"
      }
    );

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro ao responder:", err.message);
    res.status(200).json({ ok: true });
  }
});

export default app;
