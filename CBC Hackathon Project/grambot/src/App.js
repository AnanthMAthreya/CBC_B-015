import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./components/Home";
import Schemes from "./components/Schemes";
import Services from "./components/Services";
import Prices from "./components/Prices";
import LanguageSelector from "./components/LanguageSelector"; // Import the selector
import './App.css';

function App() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <Router>
      <div>
        {/* Language selector visible on all pages */}
        <div style={{ textAlign: 'right', padding: '10px', backgroundColor: 'peachpuff' }}>
          <LanguageSelector
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/services" element={<Services />} />
          <Route path="/prices" element={<Prices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
