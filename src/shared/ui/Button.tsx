import React from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '../theme/tokens';
import SmartLink from './SmartLink';

const buttonStyles = css<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: ${tokens.radius.pill};
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'ghost' ? 'rgba(255, 255, 255, 0.16)' : 'transparent'};
  background: ${({ $variant }) =>
    $variant === 'secondary'
      ? tokens.color.surfaceStrong
      : $variant === 'ghost'
        ? 'transparent'
        : `linear-gradient(135deg, ${tokens.color.brand} 0%, ${tokens.color.brandDark} 100%)`};
  color: ${({ $variant }) =>
    $variant === 'secondary' || $variant === 'ghost'
      ? tokens.color.inkInverse
      : '#ffffff'};
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${tokens.shadow.soft};
    border-color: ${({ $variant }) =>
      $variant === 'ghost' ? 'rgba(255, 255, 255, 0.28)' : 'transparent'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
    box-shadow: none;
  }
`;

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

const StyledAnchor = styled.a<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

const StyledSmartLink = styled(SmartLink)<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

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
  const variant = props.variant || 'primary';

  if ('to' in props && props.to) {
    const { children, className, to } = props;
    return (
      <StyledSmartLink className={className} href={to} $variant={variant}>
        {children}
      </StyledSmartLink>
    );
  }

  if ('href' in props && props.href) {
    const { children, className, href, variant: _variant, ...anchorProps } = props;
    return (
      <StyledAnchor
        className={className}
        href={href}
        $variant={variant}
        rel={anchorProps.target === '_blank' ? 'noopener noreferrer' : anchorProps.rel}
        {...anchorProps}
      >
        {children}
      </StyledAnchor>
    );
  }

  const { children, className, variant: _variant, ...buttonProps } = props;
  return (
    <StyledButton className={className} $variant={variant} {...buttonProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
