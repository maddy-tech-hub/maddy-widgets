import { HeaderProps } from '@src/interfaces/header';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavList,
  LoginLink,
  MenuToggle,
  Sidebar,
  SidebarContent,
  SidebarNavList,
} from '@src/styles/Header.styles';
import React, { useEffect, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header: React.FC<HeaderProps> = ({
  menuLinks,
  logoSrc,
  menuOpen,
  setMenuOpen,
  onLoginClick,
  theme,
}) => {
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // useCallback to prevent unnecessary re-creations of the handler
  const handleResize = useCallback(() => {
    if (window.innerWidth > 768) {
      setMenuOpen(false);
    }
  }, [setMenuOpen]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <HeaderContainer theme={theme}>
        {/* Logo */}
        <Logo>{logoSrc && <img src={logoSrc} alt="Main Logo" />}</Logo>

        {/* Desktop Navigation */}
        <Nav theme={theme}>
          <NavList theme={theme}>
            {menuLinks.map((link) => (
              <li key={link.url}>
                <Link to={link.url}>{link.label}</Link>
              </li>
            ))}
          </NavList>
        </Nav>

        {/* Login Button (Desktop) */}
        {onLoginClick && (
          <LoginLink onClick={onLoginClick} theme={theme}>
            Login
          </LoginLink>
        )}

        {/* Menu Toggle (Mobile) */}
        <MenuToggle onClick={toggleMenu} theme={theme}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
      </HeaderContainer>

      {/* Sidebar for Mobile */}
      <Sidebar menuOpen={menuOpen} theme={theme}>
        <SidebarContent>
          <SidebarNavList theme={theme}>
            {menuLinks.map((link) => (
              <li key={link.url}>
                <Link to={link.url} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </SidebarNavList>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default Header;
