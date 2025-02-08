import React from 'react';
import { LinkProps } from '@src/interfaces/common';
import { defaultThemeColors, FooterProps } from '@src/interfaces/footer';
import { getSocialIcon } from './Service/GetSocialIcon';
import '../styles/css/footer.css';

const FooterSection: React.FC<{
  title?: string;
  links?: LinkProps[];
  titleColor?: string;
}> = ({ title, links, titleColor }) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="footer-section">
      {title && <h4 style={{ color: titleColor }}>{title}</h4>}
      {links.map(
        (link) =>
          link.url && (
            <a key={link.url} href={link.url} className="footer-link">
              {link.label || link.url}
            </a>
          )
      )}
    </div>
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
    <footer
      className="footer"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
      }}
    >
      <div className="footer-grid">
        {(logoSrc || address || hasSocialLinks) && (
          <div className="footer-section">
            {logoSrc && (
              <img src={logoSrc} alt="Company Logo" className="footer-logo" />
            )}
            {address && <p>{address}</p>}
            {hasSocialLinks && (
              <div className="footer-social">
                {Object.entries(socialLinks).map(([key, url]) =>
                  url ? (
                    <a
                      key={key}
                      href={url}
                      className="footer-social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      {getSocialIcon(key)}
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}

        {linkSections.map((linkSection, index) => (
          <FooterSection
            key={index}
            title={linkSection.title}
            links={linkSection.links}
            titleColor={themeColors.sectionTitleColor}
          />
        ))}
      </div>

      {showFooterBottom && companyName && (
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All Rights
            Reserved.
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
