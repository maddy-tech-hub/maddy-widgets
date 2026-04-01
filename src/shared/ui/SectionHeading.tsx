import React from 'react';
import styled from 'styled-components';
import { tokens } from '../theme/tokens';

const Wrapper = styled.div`
  margin-bottom: 24px;
`;

const Eyebrow = styled.p`
  margin: 0 0 8px;
  color: var(--section-eyebrow-color, ${tokens.color.brand});
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--section-title-color, ${tokens.color.ink});
  font-size: clamp(1.9rem, 2.8vw, 2.9rem);
  line-height: 1.08;
`;

const Subtitle = styled.p`
  margin: 10px 0 0;
  max-width: 680px;
  color: var(--section-subtitle-color, ${tokens.color.inkMuted});
  font-size: 1rem;
  line-height: 1.8;
`;

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  eyebrow,
}) => (
  <Wrapper>
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    <Title>{title}</Title>
    {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
  </Wrapper>
);

export default SectionHeading;
