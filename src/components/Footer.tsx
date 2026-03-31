import React from 'react';
import styled from 'styled-components';
import { LinkProps } from '@src/interfaces/common';
import { defaultThemeColors, FooterProps } from '@src/interfaces/footer';
import { getSocialIcon } from './Service/GetSocialIcon';
import SmartLink from '@src/shared/ui/SmartLink';
import { tokens } from '@src/shared/theme/tokens';

const FooterShell = styled.footer<{ $background?: string; $text?: string }>`
  position: relative;
  overflow: hidden;
  margin-top: 4rem;
  padding: 3rem 1.25rem 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(17, 126, 255, 0.16), transparent 28%),
    linear-gradient(180deg, rgba(10, 22, 40, 0.98), rgba(7, 17, 31, 1));
  color: ${({ $text }) => $text || tokens.color.inkInverse};
`;

const FooterGrid = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(240px, 1.3fr) repeat(2, minmax(180px, 1fr));
  gap: 1.5rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BrandLine = styled.span`
  color: rgba(248, 251, 255, 0.74);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const BrandTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.5rem, 2.4vw, 2.2rem);
  line-height: 1.1;
`;

const BrandCopy = styled.p`
  margin: 0;
  max-width: 30rem;
  color: rgba(248, 251, 255, 0.72);
  line-height: 1.8;
`;

const FooterLogo = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  object-position: center;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: ${tokens.shadow.soft};
`;

const FooterSectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterSectionTitle = styled.h4<{ $titleColor?: string }>`
  margin: 0;
  color: ${({ $titleColor }) => $titleColor || '#7fdfff'};
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const FooterLink = styled(SmartLink)`
  color: rgba(248, 251, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${tokens.color.inkInverse};
    transform: translateX(2px);
  }
`;

const FooterSocial = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const FooterSocialLink = styled.a`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(248, 251, 255, 0.86);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.12);
  }
`;

const FooterBottom = styled.div`
  width: min(1200px, 100%);
  margin: 2rem auto 0;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(248, 251, 255, 0.56);
  font-size: 0.92rem;
`;

const FooterSection: React.FC<{
  title?: string;
  links?: LinkProps[];
  titleColor?: string;
}> = ({ title, links, titleColor }) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <FooterSectionWrap>
      {title ? <FooterSectionTitle $titleColor={titleColor}>{title}</FooterSectionTitle> : null}
      {links.map(
        (link, index) =>
          link.url ? (
            <FooterLink key={`${link.url}-${link.label || 'link'}-${index}`} href={link.url}>
              {link.label || link.url}
            </FooterLink>
          ) : null
      )}
    </FooterSectionWrap>
  );
};

const Footer: React.FC<FooterProps> = ({
  companyName,
  address,
  logoSrc,
  socialLinks = {},
  linkSections = [],
  showFooterBottom = false,
  themeColors = defaultThemeColors,
}) => {
  const hasSocialLinks = Object.values(socialLinks).some((link) => !!link);

  return (
    <FooterShell
      $background={themeColors.background}
      $text={themeColors.text}
    >
      <FooterGrid>
        <BrandBlock>
          <BrandLine>Build with confidence</BrandLine>
          {logoSrc ? <FooterLogo src={logoSrc} alt="Company Logo" /> : null}
          <BrandTitle>{companyName}</BrandTitle>
          {address ? <BrandCopy>{address}</BrandCopy> : null}
          {hasSocialLinks ? (
            <FooterSocial>
              {Object.entries(socialLinks).map(([key, url]) =>
                url ? (
                  <FooterSocialLink
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(key)}
                  </FooterSocialLink>
                ) : null
              )}
            </FooterSocial>
          ) : null}
        </BrandBlock>

        {linkSections.map((section, index) => (
          <FooterSection
            key={`${section.title || 'links'}-${index}`}
            title={section.title}
            links={section.links}
            titleColor={themeColors.sectionTitleColor}
          />
        ))}
      </FooterGrid>

      {showFooterBottom && companyName ? (
        <FooterBottom>
          &copy; {new Date().getFullYear()} {companyName}. Crafted for clean UX,
          strong architecture, and reliable delivery.
        </FooterBottom>
      ) : null}
    </FooterShell>
  );
};

export default Footer;
