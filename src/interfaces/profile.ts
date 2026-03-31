export interface ProfileProps {
  profileImage?: string;
  siteTitle: string;
  socialLinks: Record<string, string>;
  profileText: {
    greeting: string;
    name: string;
    title: string;
    description: React.ReactNode;
    aboutLinkText: string;
    aboutLinkURL: string;
    cvLinkText: string;
    cvLinkURL: string;
  };
}
