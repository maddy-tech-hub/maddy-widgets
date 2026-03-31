import styled from 'styled-components';
import { tokens } from '../theme/tokens';

const SurfaceCard = styled.article<{ accentColor?: string }>`
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 250, 255, 0.95)),
    ${tokens.color.surface};
  border: 1px solid ${({ accentColor }) => accentColor || tokens.color.border};
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.card};
  padding: 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    background: ${({ accentColor }) => accentColor || tokens.color.brand};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadow.cardHover};
    border-color: ${({ accentColor }) => accentColor || tokens.color.borderStrong};
  }
`;

export default SurfaceCard;
