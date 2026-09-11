import React from 'react';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerText?: React.ReactNode;
}
