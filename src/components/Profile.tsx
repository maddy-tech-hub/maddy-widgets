import React from 'react';
import { ProfileProps } from '@src/interfaces/profile';
import {
  Text,
  Section,
  Content,
  SocialIcons,
  Highlights,
  HighlightPill,
  Metrics,
  MetricCard,
  MetricLabel,
  MetricValue,
  ImageContainer,
  ImageWrapper,
  ProfileImage,
  ButtonIconsWrapper,
  ButtonsWrapper,
} from '@src/styles/profile.styles';
import { getSocialIcon } from './Service/GetSocialIcon';
import Button from '@src/shared/ui/Button';

const Profile: React.FC<ProfileProps> = ({
  profileImage,
  siteTitle,
  socialLinks,
  highlights = [],
  metrics = [],
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
          {profileText.badge ? <h4>{profileText.badge}</h4> : null}
          <h1>{profileText.greeting}</h1>
          <h2>{profileText.name}</h2>
          <h3>
            <span>{profileText.title}</span>
          </h3>
          <p>{profileText.description}</p>

          {highlights.length > 0 ? (
            <Highlights>
              {highlights.map((highlight) => (
                <HighlightPill key={highlight}>{highlight}</HighlightPill>
              ))}
            </Highlights>
          ) : null}

          <ButtonIconsWrapper>
            <ButtonsWrapper>
              <Button href={profileText.cvLinkURL} target="_blank">
                {profileText.cvLinkText}
              </Button>
              <Button to={profileText.aboutLinkURL} variant="secondary">
                {profileText.aboutLinkText}
              </Button>
            </ButtonsWrapper>

            <SocialIcons>
              {socialLinksData.map(
                (link, index) =>
                  link.icon &&
                  link.url && (
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

            {metrics.length > 0 ? (
              <Metrics>
                {metrics.map((metric) => (
                  <MetricCard key={`${metric.label}-${metric.value}`}>
                    <MetricValue>{metric.value}</MetricValue>
                    <MetricLabel>{metric.label}</MetricLabel>
                  </MetricCard>
                ))}
              </Metrics>
            ) : null}
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
