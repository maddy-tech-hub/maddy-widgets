export interface ProfileProps {
  profileImage?: string;
  siteTitle: string;
  socialLinks: Record<string, string>;
  highlights?: string[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  profileText: {
    greeting: string;
    name: string;
    title: string;
    description: React.ReactNode;
    badge?: string;
    aboutLinkText: string;
    aboutLinkURL: string;
    cvLinkText: string;
    cvLinkURL: string;
  };
}
