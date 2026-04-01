import { HeaderProps } from '@src/interfaces/header';
import {
  HeaderShell,
  HeaderContainer,
  Logo,
  Nav,
  NavList,
  LoginLink,
  MenuToggle,
  SidebarBackdrop,
  Sidebar,
  SidebarContent,
  SidebarHeaderRow,
  SidebarCloseButton,
  SidebarNavList,
  MobileLoginButton,
} from '@src/styles/Header.styles';
import React, { useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SmartLink from '@src/shared/ui/SmartLink';

const Header: React.FC<HeaderProps> = ({
  menuLinks,
  logoSrc,
  logoPresentation,
  menuOpen,
  setMenuOpen,
  onLoginClick,
  theme,
}) => {
  const toggleMenu = () => setMenuOpen((current) => !current);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [menuOpen, setMenuOpen]);

  const handleMobileLogin = () => {
    closeMenu();
    onLoginClick?.();
  };

  return (
    <>
      <HeaderShell theme={theme}>
        <HeaderContainer>
          <SmartLink href="/" aria-label="Go to home page">
            <Logo $presentation={logoPresentation}>
              {logoSrc && <img src={logoSrc} alt="Main Logo" />}
            </Logo>
          </SmartLink>

          <Nav>
            <NavList theme={theme}>
              {menuLinks.map((link) => (
                <li key={link.url}>
                  <SmartLink href={link.url}>{link.label}</SmartLink>
                </li>
              ))}
            </NavList>
          </Nav>

          {onLoginClick ? (
            <LoginLink onClick={onLoginClick} theme={theme}>
              Login
            </LoginLink>
          ) : null}

          <MenuToggle
            onClick={toggleMenu}
            theme={theme}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>
        </HeaderContainer>
      </HeaderShell>

      <SidebarBackdrop menuOpen={menuOpen} onClick={closeMenu} aria-label="Close menu overlay" />

      <Sidebar id="mobile-navigation" menuOpen={menuOpen} theme={theme}>
        <SidebarContent>
          <SidebarHeaderRow>
            <SmartLink href="/" aria-label="Go to home page" onClick={closeMenu}>
              <Logo $presentation={logoPresentation}>
                {logoSrc && <img src={logoSrc} alt="Main Logo" />}
              </Logo>
            </SmartLink>

            <SidebarCloseButton onClick={closeMenu} theme={theme} aria-label="Close navigation">
              <FaTimes />
            </SidebarCloseButton>
          </SidebarHeaderRow>

          <SidebarNavList theme={theme}>
            {menuLinks.map((link) => (
              <li key={link.url}>
                <SmartLink href={link.url} onClick={closeMenu}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </SidebarNavList>

          {onLoginClick ? (
            <MobileLoginButton onClick={handleMobileLogin} theme={theme}>
              Login
            </MobileLoginButton>
          ) : null}
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default Header;
