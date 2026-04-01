export interface SocialLinks {
  whatsapp?: string;
  instagram?: string;
  linkedin?: string;
  gmail?: string;
}

export interface LinkProps {
  url: string;
  label?: string;
}

export interface LogoPresentation {
  width?: string;
  height?: string;
  borderRadius?: string;
  background?: string;
  padding?: string;
  fit?: 'cover' | 'contain';
  position?: string;
  scale?: number;
}
