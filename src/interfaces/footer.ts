import { SocialLinks, LinkProps, LogoPresentation } from './common';

export interface LinkSection {
  title?: string;
  links?: LinkProps[];
}

export interface ThemeColors {
  background?: string;
  text?: string;
  linkHover?: string;
  socialHover?: string;
  footerBottom?: string;
  sectionTitleColor?: string;
}

export interface FooterProps {
  companyName: string;
  address: string;
  logoSrc: string;
  logoPresentation?: LogoPresentation;
  socialLinks?: SocialLinks;
  showFooterBottom?: boolean;
  linkSections?: LinkSection[];
  themeColors?: ThemeColors;
}

export const defaultThemeColors: ThemeColors = {
  background: '#1f1f1f',
  text: '#ffffff',
  linkHover: '#ffa726',
  socialHover: '#ffdd57',
  footerBottom: '#bbb',
  sectionTitleColor: '#ffdd57',
};
