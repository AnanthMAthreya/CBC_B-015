import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Prices = () => {const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [showSpeaker, setShowSpeaker] = useState(false);

  const handleRecord = () => {
    alert('Voice recording feature coming soon!');
  };

  const handleSubmit = () => {
    const mockResponse = `This is a response to your question: "${query}"`;
    setResponse(mockResponse);
    setShowSpeaker(true);
  };

  const speakResponse = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = 'en-IN'; // Use 'hi-IN' for Hindi, etc.
      speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <div className="home">
      <h2>Government Schemes</h2>
      <p>Ask your queries about available market prices.</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question..."
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '60%',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button onClick={handleRecord} title="Record Voice" style={{ padding: '10px 16px' }}>
          Record your voice🎤
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleSubmit} style={{ marginTop: '30px' }}>
          Submit
        </button>
        <button onClick={() => navigate('/')} style={{ marginTop: '30px' }}>
          ⬅ Back to Home
        </button>
      </div>

      {response && (
        <div
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '20px',
            margin: '30px auto 0',
            borderRadius: '8px',
            maxWidth: '70%',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            textAlign: 'left',
            position: 'relative',
          }}
        >
          <strong>Chatbot Response:</strong>
          <p>{response}</p>
          {showSpeaker && (
            <button
              onClick={speakResponse}
              title="Play Voice"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              🔊
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Prices;