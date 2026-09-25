import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | ghost | danger | icon
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
