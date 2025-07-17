require('dotenv').config();
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

let sock;
let messages = [];

// Função para obter resposta da IA do OpenRouter
async function getAIResponse(message) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const endpoint = `https://openrouter.ai/api/v1/chat/completions`;
  try {
    const response = await axios.post(
      endpoint,
      {
        model: "openai/gpt-3.5-turbo", // Você pode trocar por outro modelo suportado
        messages: [
          { role: "system", content: "Você é um atendente virtual de restaurante, responda de forma simpática e objetiva." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // Os dois abaixo são opcionais, mas pode deixar se quiser:
          "HTTP-Referer": "https://seusite.com",
          "X-Title": "PedeAiBot"
        },
        timeout: 30000,
      }
    );
    return response.data.choices[0].message.content || "Desculpe, não entendi.";
  } catch (err) {
    return "Erro ao acessar a IA: " + (err.response?.data?.error?.message || err.message);
  }
}

async function startWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    // logger: pino({ level: 'silent' })
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      qrcode.generate(qr, { small: true });
      console.log('Escaneie o QR Code acima com o WhatsApp do restaurante!');
    }
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        startWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('✅ WhatsApp conectado!');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.key.fromMe && msg.message?.conversation) {
      const data = {
        id: msg.key.id,
        from: msg.key.remoteJid,
        text: msg.message.conversation,
        timestamp: msg.messageTimestamp,
      };
      messages.push(data);
      console.log('Mensagem recebida:', data);
      // Resposta automática da IA
      const aiReply = await getAIResponse(data.text);
      await sock.sendMessage(data.from, { text: aiReply });
      console.log('Resposta da IA enviada:', aiReply);
    }
  });
}

// Endpoint para listar mensagens recebidas
app.get('/api/whatsapp/messages', (req, res) => {
  res.json(messages);
});

// Endpoint para enviar mensagem
app.post('/api/whatsapp/send', async (req, res) => {
  const { to, text } = req.body;
  if (!to || !text) return res.status(400).json({ error: 'to e text são obrigatórios' });
  try {
    await sock.sendMessage(to, { text });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.WHATSAPP_BOT_PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor WhatsApp rodando em http://localhost:${PORT}`);
  startWhatsApp();
}); 