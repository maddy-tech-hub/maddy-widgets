import React from 'react';
import styled from 'styled-components';
import { LinkProps } from '@src/interfaces/common';
import { tokens } from '../theme/tokens';
import Button from './Button';
import SectionHeading from './SectionHeading';
import SurfaceCard from './SurfaceCard';

interface FeatureItem {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  action?: LinkProps;
}

interface FeatureGridProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FeatureItem[];
}

const Wrapper = styled.section`
  width: min(1200px, 100%);
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
`;

const CardEyebrow = styled.p`
  margin: 0 0 0.75rem;
  color: ${tokens.color.brandDark};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${tokens.color.ink};
  font-size: 1.25rem;
  line-height: 1.25;
`;

const CardCopy = styled.p`
  margin: 0.9rem 0 0;
  color: ${tokens.color.inkMuted};
  line-height: 1.75;
`;

const BulletList = styled.ul`
  display: grid;
  gap: 0.6rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 1rem;
    color: ${tokens.color.inkMuted};
    line-height: 1.7;

    &::before {
      content: '';
      position: absolute;
      top: 0.7rem;
      left: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${tokens.color.brand};
    }
  }
`;

const ActionWrap = styled.div`
  margin-top: 1.2rem;
`;

const FeatureGrid: React.FC<FeatureGridProps> = ({
  eyebrow,
  title,
  subtitle,
  items,
}) => (
  <Wrapper>
    <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

    <Grid>
      {items.map((item) => (
        <SurfaceCard key={item.title}>
          {item.eyebrow ? <CardEyebrow>{item.eyebrow}</CardEyebrow> : null}
          <CardTitle>{item.title}</CardTitle>
          <CardCopy>{item.description}</CardCopy>

          {item.bullets && item.bullets.length > 0 ? (
            <BulletList>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </BulletList>
          ) : null}

          {item.action ? (
            <ActionWrap>
              <Button
                href={item.action.url.startsWith('/') ? undefined : item.action.url}
                to={item.action.url.startsWith('/') ? item.action.url : undefined}
                target={item.action.url.startsWith('/') ? undefined : '_blank'}
                variant="secondary"
              >
                {item.action.label || item.action.url}
              </Button>
            </ActionWrap>
          ) : null}
        </SurfaceCard>
      ))}
    </Grid>
  </Wrapper>
);

export default FeatureGrid;
