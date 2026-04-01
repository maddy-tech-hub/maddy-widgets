import React from 'react';
import styled from 'styled-components';
import { LinkProps, LogoPresentation } from '@src/interfaces/common';
import { defaultThemeColors, FooterProps } from '@src/interfaces/footer';
import { getSocialIcon } from './Service/GetSocialIcon';
import SmartLink from '@src/shared/ui/SmartLink';
import { tokens } from '@src/shared/theme/tokens';

const FooterShell = styled.footer<{ $background?: string; $text?: string }>`
  position: relative;
  overflow: hidden;
  margin-top: 3.25rem;
  padding: 2.35rem 1.25rem 1.25rem;
  background:
    radial-gradient(circle at top right, rgba(17, 126, 255, 0.16), transparent 28%),
    linear-gradient(180deg, rgba(10, 22, 40, 0.98), rgba(7, 17, 31, 1));
  color: ${({ $text }) => $text || tokens.color.inkInverse};
`;

const FooterGrid = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(250px, 1.05fr) minmax(0, 1.95fr);
  gap: 1.5rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 980px) {
    padding-bottom: 0.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
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
  max-width: 28rem;
  color: rgba(248, 251, 255, 0.72);
  line-height: 1.8;
`;

const FooterLogo = styled.img<{ $presentation?: LogoPresentation }>`
  width: ${({ $presentation }) => $presentation?.width || '84px'};
  height: ${({ $presentation }) => $presentation?.height || '84px'};
  object-fit: ${({ $presentation }) => $presentation?.fit || 'cover'};
  object-position: ${({ $presentation }) => $presentation?.position || 'center'};
  border-radius: ${({ $presentation }) => $presentation?.borderRadius || '24px'};
  background: ${({ $presentation }) =>
    $presentation?.background || 'rgba(255, 255, 255, 0.96)'};
  padding: ${({ $presentation }) => $presentation?.padding || '0'};
  box-sizing: border-box;
  transform: scale(${({ $presentation }) => $presentation?.scale || 1});
  box-shadow: ${tokens.shadow.soft};
`;

const FooterSectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
`;

const FooterLinksCluster = styled.div`
  display: grid;
  gap: 0.8rem;
  align-content: start;
`;

const FooterLinksRow = styled.div<{ $columns: number }>`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  align-items: start;

  @media (max-width: 1120px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
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
  line-height: 1.55;
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
  margin: 1.4rem auto 0;
  padding-top: 0.85rem;
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
  logoPresentation,
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
          {logoSrc ? (
            <FooterLogo
              src={logoSrc}
              alt="Company Logo"
              $presentation={logoPresentation}
            />
          ) : null}
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

        {linkSections.length > 0 ? (
          <FooterLinksCluster>
            <FooterLinksRow $columns={Math.max(1, linkSections.length)}>
              {linkSections.map((section, index) => (
                <FooterSection
                  key={`${section.title || 'links'}-${index}`}
                  title={section.title}
                  links={section.links}
                  titleColor={themeColors.sectionTitleColor}
                />
              ))}
            </FooterLinksRow>
          </FooterLinksCluster>
        ) : null}
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
