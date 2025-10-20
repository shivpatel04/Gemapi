require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const { message } = req.body;
    
    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});