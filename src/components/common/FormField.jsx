import React from 'react';

export const FormField = ({
  label,
  error,
  helper,
  required = false,
  children,
  className = ''
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label">
          <span>
            {label} {required && <span style={{ color: 'var(--spartan-green)' }}>*</span>}
          </span>
          {helper && <span style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', fontWeight: 400 }}>{helper}</span>}
        </label>
      )}
      {children}
      {error && (
        <span style={{ fontSize: '0.75rem', color: 'var(--spartan-red)', marginTop: '2px' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;
