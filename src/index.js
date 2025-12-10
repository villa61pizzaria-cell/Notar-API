import express from "express";

const app = express();
app.use(express.json({ limit: "50mb" }));

// Rota de teste
app.get("/", (req, res) => res.send("Notar API rodando."));

// Webhook da Z-API (temporário)
app.post("/webhook", async (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.status(200).json({ ok: true });
});

export default app;
