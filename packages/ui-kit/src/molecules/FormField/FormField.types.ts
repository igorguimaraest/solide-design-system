import React from 'react';

export interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  isRequired?: boolean;
  children: React.ReactElement<{
    id?: string;
    isInvalid?: boolean;
    'aria-describedby'?: string;
    required?: boolean;
  }>;
  className?: string;
}
