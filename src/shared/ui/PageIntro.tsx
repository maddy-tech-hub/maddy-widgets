import React from 'react';
import styled from 'styled-components';
import { LinkProps } from '@src/interfaces/common';
import { tokens } from '../theme/tokens';
import Button from './Button';

interface IntroStat {
  label: string;
  value: string;
}

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description: string;
  highlights?: string[];
  stats?: IntroStat[];
  actions?: LinkProps[];
}

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border-radius: ${tokens.radius.xl};
  border: 1px solid ${tokens.color.borderStrong};
  background:
    radial-gradient(circle at top right, rgba(17, 126, 255, 0.18), transparent 34%),
    radial-gradient(circle at bottom left, rgba(25, 184, 155, 0.16), transparent 34%),
    ${tokens.gradient.surface};
  box-shadow: ${tokens.shadow.card};
`;

const Eyebrow = styled.p`
  margin: 0 0 0.85rem;
  color: ${tokens.color.brand};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  color: ${tokens.color.ink};
  font-size: clamp(2.1rem, 4vw, 3.6rem);
  line-height: 1.05;
`;

const Description = styled.p`
  margin: 1rem 0 0;
  max-width: 52rem;
  color: ${tokens.color.inkMuted};
  font-size: 1.02rem;
  line-height: 1.8;
`;

const HighlightRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const Highlight = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.55rem 0.95rem;
  border-radius: ${tokens.radius.pill};
  border: 1px solid rgba(17, 126, 255, 0.18);
  background: rgba(255, 255, 255, 0.78);
  color: ${tokens.color.ink};
  font-size: 0.92rem;
  font-weight: 600;
`;

const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1.25rem;
  margin-top: 1.9rem;
`;

const Stats = styled.div`
  display: grid;
  flex: 1 1 28rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.9rem;
`;

const StatCard = styled.div`
  padding: 1rem 1.05rem;
  border-radius: ${tokens.radius.lg};
  background: rgba(8, 24, 48, 0.04);
  border: 1px solid rgba(13, 27, 51, 0.08);
`;

const StatValue = styled.strong`
  display: block;
  color: ${tokens.color.ink};
  font-size: 1.3rem;
  font-weight: 800;
`;

const StatLabel = styled.span`
  display: block;
  margin-top: 0.25rem;
  color: ${tokens.color.inkMuted};
  font-size: 0.9rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
`;

const PageIntro: React.FC<PageIntroProps> = ({
  eyebrow,
  title,
  description,
  highlights = [],
  stats = [],
  actions = [],
}) => (
  <Wrapper>
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    <Title>{title}</Title>
    <Description>{description}</Description>

    {highlights.length > 0 ? (
      <HighlightRow>
        {highlights.map((item) => (
          <Highlight key={item}>{item}</Highlight>
        ))}
      </HighlightRow>
    ) : null}

    {(stats.length > 0 || actions.length > 0) && (
      <FooterRow>
        {stats.length > 0 ? (
          <Stats>
            {stats.map((stat) => (
              <StatCard key={`${stat.label}-${stat.value}`}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </Stats>
        ) : null}

        {actions.length > 0 ? (
          <Actions>
            {actions.map((action, index) => (
              <Button
                key={`${action.url}-${index}`}
                href={action.url.startsWith('/') ? undefined : action.url}
                to={action.url.startsWith('/') ? action.url : undefined}
                target={action.url.startsWith('/') ? undefined : '_blank'}
                variant={index === 0 ? 'primary' : 'secondary'}
              >
                {action.label || action.url}
              </Button>
            ))}
          </Actions>
        ) : null}
      </FooterRow>
    )}
  </Wrapper>
);

export default PageIntro;
