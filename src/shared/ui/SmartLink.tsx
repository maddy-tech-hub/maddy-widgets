import React from 'react';

interface SmartLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const isInternalPath = (href: string) => href.startsWith('/') && !href.startsWith('//');

const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  children,
  className,
  onClick,
  rel,
  target,
  ...props
}) => {
  const internal = isInternalPath(href);
  const activePath =
    typeof window !== 'undefined' ? window.location.pathname : undefined;

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || !internal) {
      return;
    }

    event.preventDefault();

    if (typeof window !== 'undefined' && window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <a
      className={className}
      href={href}
      onClick={handleClick}
      rel={internal ? rel : rel || 'noopener noreferrer'}
      target={internal ? target : target || '_blank'}
      aria-current={internal && activePath === href ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

export default SmartLink;
