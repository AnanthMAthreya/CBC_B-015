import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ onLanguageChange }) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (e) => {
    // Ensure that the event is valid and e.target is accessible
    if (e && e.target && e.target.value) {
      const language = e.target.value;
      setSelectedLanguage(language);
      i18n.changeLanguage(language);

      // Call onLanguageChange if it is a function
      if (typeof onLanguageChange === 'function') {
        onLanguageChange(language);
      }
    } else {
      console.error("Event or target not found in changeLanguage.");
    }
  };

  return (
    <select onChange={changeLanguage} value={selectedLanguage}>
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="kn">ಕನ್ನಡ</option>
    </select>
  );
};

export default LanguageSelector;
