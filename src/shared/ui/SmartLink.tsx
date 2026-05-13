import React, { useEffect, useState } from 'react';

interface SmartLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  activePathOverride?: string;
}

const isInternalPath = (href: string) => href.startsWith('/') && !href.startsWith('//');
const normalizePath = (value: string) => {
  const pathOnly = value.split(/[?#]/)[0] || '/';
  const trimmed = pathOnly.replace(/\/+$/, '');
  return trimmed || '/';
};

const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  children,
  className,
  onClick,
  rel,
  target,
  activePathOverride,
  ...props
}) => {
  const internal = isInternalPath(href);
  const [activePath, setActivePath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const normalizedHref = internal ? normalizePath(href) : undefined;
  const normalizedActivePath =
    typeof activePathOverride === 'string'
      ? normalizePath(activePathOverride)
      : activePath;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleLocationChange = () => {
      setActivePath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || !internal) {
      return;
    }

    event.preventDefault();

    if (
      typeof window !== 'undefined' &&
      normalizePath(window.location.pathname) !== normalizePath(href)
    ) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setActivePath(normalizePath(href));
    }
  };

  return (
    <a
      className={className}
      href={href}
      onClick={handleClick}
      rel={internal ? rel : rel || 'noopener noreferrer'}
      target={internal ? target : target || '_blank'}
      aria-current={
        internal && normalizedActivePath === normalizedHref ? 'page' : undefined
      }
      {...props}
    >
      {children}
    </a>
  );
};

export default SmartLink;
