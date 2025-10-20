import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post('http://localhost:3001/api/chat', { message });
      setResponse(result.data.reply);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: Failed to get response');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Gemini AI Chat</h1>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          placeholder="Enter your message..."
        />
        <button type="submit" disabled={loading} className="send-button">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {response && (
        <div className="response-container">
          <h2 className="response-title">Response:</h2>
          <p className="response-text">{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;