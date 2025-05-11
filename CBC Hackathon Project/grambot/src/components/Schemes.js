import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendQuery, recordAudio } from './api';
import './Home.css'; // or Common.css

const Schemes = ({ language }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [responsePlayed, setResponsePlayed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Change language in i18n whenever prop changes
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const handleRecord = async () => {
    alert(t('voiceAlert'));
    try {
      const audioBlob = await recordAudio();
      if (audioBlob) {
        const transcribedText = await recordAudio(audioBlob);
        setQuery(transcribedText);
      }
    } catch (error) {
      console.error('Recording/transcription error:', error);
      alert(t('apiError'));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const audioUrl = await sendQuery(query, 'schemes', language); // Pass selected language
      setResponsePlayed(true);
      setLoading(false);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('API error:', error);
      setLoading(false);
      alert(t('apiError'));
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
        <button onClick={handleSubmit} style={{ marginTop: '30px' }} disabled={loading}>
          {loading ? t('loading') : t('submit')}
        </button>
        <button onClick={() => navigate('/')} style={{ marginTop: '30px' }}>
          {t('back')}
        </button>
      </div>

      {responsePlayed && (
        <div
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '20px',
            margin: '30px auto 0',
            borderRadius: '8px',
            maxWidth: '70%',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <strong>{t('chatbotResponse')}</strong>
          <p>{t('responsePlayed')}</p>
        </div>
      )}
    </div>
  );
};

export default Schemes;
