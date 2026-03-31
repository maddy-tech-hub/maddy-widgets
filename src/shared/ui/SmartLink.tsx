import React from 'react';

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  return (
    <a
      className={className}
      href={href}
      onClick={onClick}
      rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
      target={href.startsWith('/') ? undefined : '_blank'}
    >
      {children}
    </a>
  );
};

export default SmartLink;
