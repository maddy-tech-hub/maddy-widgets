import React, { useState } from 'react';

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
import CardSection from './components/Card/CardSection';
import Contact from './mock/Contact';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(headerData.menuOpen);
  return (
    <>
      <Header
        menuLinks={headerData.menuLinks}
        logoSrc={headerData.logoSrc}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onLoginClick={headerData.onLoginClick}
        theme={headerData.theme}
      />
      <Profile {...profileData} />
      <CardSection {...cardData} />
      <Contact />
      <Footer {...footerData} />
      <WhatsAppWidget {...whatsappData} />
    </>
  );
};

export default App;
