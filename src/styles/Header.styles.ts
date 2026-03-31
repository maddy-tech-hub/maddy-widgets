import styled from 'styled-components';
import { tokens } from '@src/shared/theme/tokens';

export const HeaderShell = styled.header<{ theme?: any }>`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: ${({ theme }) =>
    theme?.headerBackgroundColor || 'rgba(7, 17, 31, 0.82)'};
  backdrop-filter: blur(18px);
`;

export const HeaderContainer = styled.div`
  width: min(1200px, calc(100% - 24px));
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.95rem 0;
`;

export const Logo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: ${tokens.shadow.soft};
  border: 1px solid rgba(255, 255, 255, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1.1);
    display: block;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavList = styled.ul<{ theme?: any }>`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  padding: 0.45rem;
  border-radius: ${tokens.radius.pill};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);

  li {
    margin: 0;
  }

  a {
    display: inline-flex;
    align-items: center;
    min-height: 42px;
    padding: 0 0.95rem;
    border-radius: ${tokens.radius.pill};
    color: ${({ theme }) => theme?.navLinkColor || 'rgba(248, 251, 255, 0.8)'};
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition:
      color 0.2s ease,
      background 0.2s ease,
      transform 0.2s ease;

    &:hover,
    &[aria-current='page'] {
      color: ${({ theme }) => theme?.navLinkHoverColor || tokens.color.inkInverse};
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-1px);
    }
  }
`;

export const LoginLink = styled.button<{ theme?: any }>`
  min-height: 46px;
  padding: 0 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${tokens.radius.pill};
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme?.loginLinkColor || tokens.color.inkInverse};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.16);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const MenuToggle = styled.button<{ theme?: any }>`
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme?.menuIconColor || tokens.color.inkInverse};
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

export const SidebarBackdrop = styled.button<{ menuOpen: boolean }>`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(7, 17, 31, 0.68);
  backdrop-filter: blur(6px);
  opacity: ${({ menuOpen }) => (menuOpen ? 1 : 0)};
  pointer-events: ${({ menuOpen }) => (menuOpen ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
  z-index: 1200;
`;

export const Sidebar = styled.aside<{ menuOpen: boolean; theme?: any }>`
  position: fixed;
  top: 0;
  right: 0;
  width: min(390px, 88vw);
  height: 100dvh;
  background: ${({ theme }) =>
    theme?.sidebarBackgroundColor || 'rgba(10, 22, 40, 0.96)'};
  color: ${({ theme }) => theme?.textColor || tokens.color.inkInverse};
  transform: ${({ menuOpen }) =>
    menuOpen ? 'translateX(0)' : 'translateX(105%)'};
  transition: transform 0.28s ease-in-out;
  z-index: 1201;
  overflow-y: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.28);

  @media (max-width: 640px) {
    width: 100vw;
    border-left: none;
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  padding:
    calc(env(safe-area-inset-top, 0px) + 0.9rem)
    1rem
    calc(env(safe-area-inset-bottom, 0px) + 1.25rem);
`;

export const SidebarHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const SidebarCloseButton = styled.button<{ theme?: any }>`
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme?.menuIconColor || tokens.color.inkInverse};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

export const SidebarNavList = styled.ul<{ theme?: any }>`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin: 0;
  padding: 0;

  a {
    display: block;
    padding: 1rem 1.05rem;
    border-radius: 20px;
    color: ${({ theme }) => theme?.navLinkColor || tokens.color.inkInverse};
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);

    &:hover,
    &[aria-current='page'] {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const MobileLoginButton = styled(LoginLink)`
  display: inline-flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;
