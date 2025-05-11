import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Schemes from "./components/Schemes";
import Services from "./components/Services";
import Prices from "./components/Prices";
import LanguageSelector from "./components/LanguageSelector"; // Import the selector
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Language selector visible on all pages */}
        <div style={{ textAlign: 'right', padding: '10px', backgroundColor: 'peachpuff' }}>
          <LanguageSelector />
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

