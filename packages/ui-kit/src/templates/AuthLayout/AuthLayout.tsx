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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[var(--solide-surface-canvas)] font-ui">
      {/* Brand Hero Panel (Navy Solide currentColor) */}
      <div className="hidden md:flex md:w-5/12 bg-[var(--solide-color-primary-900)] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle grid line background */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-[6px] bg-white text-[var(--solide-color-primary-900)] flex items-center justify-center font-display font-bold text-base shadow-sm">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">Solide</span>
        </div>

        <div className="relative z-10 max-w-sm">
          <Typography variant="display" tone="inverse" className="text-3xl leading-tight mb-4 text-white">
            Engenharia de precis?o para produtos digitais.
          </Typography>
          <Typography variant="body" tone="inverse" className="opacity-80 text-sm leading-relaxed text-[currentColor]">
            Acesso corporativo seguro para desenvolvedores, arquitetos e operadores de infraestrutura cr?tica.
          </Typography>
        </div>

        <div className="relative z-10 text-xs opacity-60 font-mono text-[currentColor]">
          solide.dev.br ? Seguran?a & Criptografia Ponta a Ponta
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md bg-solide-surface border border-solide-subtle rounded-[var(--sld-radius-xl,16px)] p-8 shadow-[var(--sld-shadow-sm)]">
          <div className="mb-6">
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
