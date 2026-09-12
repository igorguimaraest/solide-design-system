import { logoLight, logoDark } from '../../assets/logos';
import React from 'react';
import { AuthLayoutProps } from './AuthLayout.types';
import { Typography } from '../../atoms/Typography';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footerText,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[var(--sld-surface-canvas)] font-ui">
      {/* Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md bg-solide-surface border border-solide-subtle rounded-[var(--sld-radius-xl)] p-8 shadow-[var(--sld-shadow-sm)]">
          <div className="mb-6">
            <img src={logoLight} className="sld-logo-light w-8 h-8 mb-4" alt="Solide" />
            <img src={logoDark} className="sld-logo-dark w-8 h-8 mb-4" alt="Solide" />
            <Typography variant="h2" tone="primary" className="mb-1">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body-sm" tone="secondary">
                {subtitle}
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {children}
          </div>

          {footerText && (
            <div className="mt-6 pt-4 border-t border-solide-subtle text-center text-xs text-solide-tertiary">
              {footerText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
