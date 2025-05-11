import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>{t('heading')}</h1>
      <h2>{t('subheading')}</h2>
      <div className="button-container">
        <button onClick={() => navigate('/schemes')}>{t('schemes')}</button>
        <button onClick={() => navigate('/services')}>{t('services')}</button>
      </div>
    </div>
  );
};

export default Home;
