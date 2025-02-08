import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import useNavigate within Router

import Header from './components/Header';
import Footer from './components/Footer';

import WhatsAppWidget from './components/WhatsAppWidget';
import Profile from './components/Profile';
import {
  cardData,
  footerData,
  headerData,
  profileData,
  whatsappData,
} from './mock/mock';
import MaddyCardSection from './components/Card/MaddyCardSection';
import Contact from './mock/Contact';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(headerData.menuOpen);
  return (
    <Router>
      <Header
        menuLinks={headerData.menuLinks}
        logoSrc={headerData.logoSrc}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onLoginClick={headerData.onLoginClick}
        theme={headerData.theme}
      />
      <Profile {...profileData} />
      <MaddyCardSection {...cardData} />
      <Contact />
      <Footer {...footerData} />
      <WhatsAppWidget {...whatsappData} />
    </Router>
  );
};

export default App;
