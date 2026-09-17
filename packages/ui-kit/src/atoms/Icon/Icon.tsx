import React from 'react';
import { IconProps } from './Icon.types';

const ICON_PATHS: Record<string, React.ReactNode> = {
  'arrow-right': <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  'arrow-left': <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-up': <path d="m18 15-6-6-6 6" />,
  'chevron-right': <path d="m9 18 6-6-6-6" />,
  'check': <polyline points="20 6 9 17 4 12" />,
  'search': <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  'x': <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  'alert-triangle': <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  'info': <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  'check-circle': <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
  'circle-x': <><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>,
  'copy': <><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>,
  'trash': <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  'menu': <><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></>,
  'user': <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  'sun': <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>,
  'moon': <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  'activity': <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  'filter': <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const pixelSize = typeof size === 'number'
    ? size
    : { sm: 14, md: 16, lg: 20 }[size];

  const content = ICON_PATHS[name] || <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />;
  const isAriaHidden = !ariaLabel;

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={isAriaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      className={`shrink-0 inline-block align-middle ${className}`}
      {...props}
    >
      {content}
    </svg>
  );
};

Icon.displayName = 'Icon';
