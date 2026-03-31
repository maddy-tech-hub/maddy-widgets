import React from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '../theme/tokens';

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: ${tokens.radius.pill};
  border: none;
  background: linear-gradient(135deg, ${tokens.color.brand} 0%, ${tokens.color.brandDark} 100%);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${tokens.shadow.card};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
    box-shadow: none;
  }
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledAnchor = styled.a`
  ${buttonStyles}
`;

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
};

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
    to?: never;
  };

type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type RouterButtonProps = BaseButtonProps & {
  to: string;
  href?: never;
};

type ButtonProps = NativeButtonProps | AnchorButtonProps | RouterButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  if ('to' in props && props.to) {
    const { children, className, to } = props;
    return (
      <StyledAnchor className={className} href={to}>
        {children}
      </StyledAnchor>
    );
  }

  if ('href' in props && props.href) {
    const { children, className, href, ...anchorProps } = props;
    return (
      <StyledAnchor
        className={className}
        href={href}
        rel={anchorProps.target === '_blank' ? 'noopener noreferrer' : anchorProps.rel}
        {...anchorProps}
      >
        {children}
      </StyledAnchor>
    );
  }

  const { children, className, ...buttonProps } = props;
  return (
    <StyledButton className={className} {...buttonProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
