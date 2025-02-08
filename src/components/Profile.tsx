import React from 'react';
import { ProfileProps } from '@src/interfaces/profile';
import {
  Text,
  Section,
  Content,
  SocialIcons,
  ImageContainer,
  ImageWrapper,
  ProfileImage,
  ButtonIconsWrapper,
  ButtonsWrapper,
  ExternalLink,
  InternalLink,
} from '@src/styles/profile.styles';
import { getSocialIcon } from './Service/GetSocialIcon';

const Profile: React.FC<ProfileProps> = ({
  profileImage,
  siteTitle,
  socialLinks,
  profileText,
}) => {
  const socialLinksData = Object.entries(socialLinks).map(([key, url]) => ({
    icon: getSocialIcon(key),
    url,
  }));

  return (
    <Section>
      <Content>
        <Text>
          <h1>{profileText.greeting}</h1>
          <h2>{profileText.name}</h2>
          <h3>
            And I'm a <span>{profileText.title}</span>
          </h3>
          <p>{profileText.description}</p>

          {/* Social Icons and Button */}
          <ButtonIconsWrapper>
            <SocialIcons>
              {socialLinksData.map(
                (link, index) =>
                  link.icon && (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon}
                    </a>
                  )
              )}
            </SocialIcons>
            <ButtonsWrapper>
              <ExternalLink
                href={profileText.cvLinkURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileText.cvLinkText}
              </ExternalLink>
              <InternalLink to={profileText.aboutLinkURL}>
                {profileText.aboutLinkText}
              </InternalLink>
            </ButtonsWrapper>
          </ButtonIconsWrapper>
        </Text>
        <ImageContainer>
          <ImageWrapper>
            <ProfileImage src={profileImage} alt={siteTitle} />
          </ImageWrapper>
        </ImageContainer>
      </Content>
    </Section>
  );
};

export default Profile;
