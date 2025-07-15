const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Use body parser to parse incoming requests
app.use(express.json());

// Replace with your own secure verify token
const VERIFY_TOKEN = "msme_bot_2025";

// Webhook verification endpoint
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Webhook to receive incoming messages
app.post('/webhook', (req, res) => {
  console.log('Received webhook event:');
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
