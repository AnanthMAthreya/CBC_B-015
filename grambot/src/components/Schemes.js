import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css'; // or Common.css if renamed


const Schemes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [showSpeaker, setShowSpeaker] = useState(false);

  const handleRecord = () => {
    alert(t('voiceAlert'));
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
      alert(t('ttsNotSupported'));
    }
  };

  return (
    <div className="home">
      <h2>{t('schemes')}</h2>
      <p>{t('askQuery1')}</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('typeQuestion')}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '60%',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button onClick={handleRecord} title="Record Voice" style={{ padding: '10px 16px' }}>
          {t('recordVoice')}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleSubmit} style={{ marginTop: '30px' }}>
          {t('submit')}
        </button>
        <button onClick={() => navigate('/')} style={{ marginTop: '30px' }}>
          {t('back')}
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
          <strong>{t('chatbotResponse')}</strong>
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
              {t('playVoice')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Schemes;



