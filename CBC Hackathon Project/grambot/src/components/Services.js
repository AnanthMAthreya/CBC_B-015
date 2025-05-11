import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendQuery, recordAudio } from './api';
import './Home.css';

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [responsePlayed, setResponsePlayed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRecord = async () => {
    alert(t('voiceAlert'));
    try {
      const audioBlob = await recordAudio(); // Assuming this starts recording
      if (audioBlob) {
        const transcribedText = await recordAudio(audioBlob); // Transcribes audio to text
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
      const audioUrl = await sendQuery(query, 'services'); // Sends query to API
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
      <h2>{t('services')}</h2>
      <p>{t('askQuery2')}</p>

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

export default Services;
