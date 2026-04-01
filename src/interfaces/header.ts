import { LinkProps, LogoPresentation } from './common';

export interface HeaderTheme {
  headerBackgroundColor?: string;
  textColor?: string;
  navLinkColor?: string;
  navLinkHoverColor?: string;
  navLinkActiveColor?: string;
  navLinkActiveBackground?: string;
  loginLinkColor?: string;
  loginLinkHoverColor?: string;
  menuIconColor?: string;
  sidebarBackgroundColor?: string;
}

export interface HeaderProps {
  menuLinks: LinkProps[];
  onLoginClick?: () => void;
  logoSrc?: string;
  logoPresentation?: LogoPresentation;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme?: HeaderTheme;
}
