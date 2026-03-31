import React from 'react';
import styled from 'styled-components';
import { tokens } from '../theme/tokens';

const FloatingButton = styled.button<{ backgroundColor: string; iconColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: none;
  border-radius: 50%;
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ iconColor }) => iconColor};
  box-shadow: ${tokens.shadow.float};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-2px) scale(1.04);
    filter: brightness(1.04);
  }

  &:focus-visible {
    outline: 3px solid rgba(12, 94, 252, 0.28);
    outline-offset: 4px;
  }
`;

interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
  iconColor: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  backgroundColor,
  iconColor,
  children,
  ...props
}) => (
  <FloatingButton
    backgroundColor={backgroundColor}
    iconColor={iconColor}
    type="button"
    {...props}
  >
    {children}
  </FloatingButton>
);

export default FloatingActionButton;
