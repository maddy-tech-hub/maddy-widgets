import styled from 'styled-components';
import { tokens } from '../theme/tokens';

const SurfaceCard = styled.article<{ accentColor?: string }>`
  background: ${tokens.color.surface};
  border: 1px solid ${({ accentColor }) => accentColor || tokens.color.border};
  border-left: 5px solid ${({ accentColor }) => accentColor || tokens.color.brand};
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.card};
  padding: 24px;
`;

export default SurfaceCard;
