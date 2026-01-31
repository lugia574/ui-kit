import type { CSSProperties, ReactNode } from 'react';
import React, { forwardRef, useId } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface CSSCustomProperties extends CSSProperties {
  '--input-width'?: string;
  '--input-height'?: string;
  '--input-radius'?: string;
  '--input-border-color'?: string;
  '--input-focus-color'?: string;
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  // Label & Text
  label?: ReactNode;
  helperText?: ReactNode;

  // Status
  status?: 'default' | 'error';

  // Slots
  prefix?: ReactNode; // 앞 아이콘
  suffix?: ReactNode; // 뒤 아이콘 (ex: 눈 모양, 검색 아이콘)

  // Styles
  fullWidth?: boolean;
  width?: string | number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      status = 'default',
      prefix,
      suffix,
      fullWidth = false,
      width,
      className,
      style,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    // 접근성을 위해 ID 자동 생성 (Label과 Input 연결)
    const uniqueId = useId();
    const inputId = id || uniqueId;

    // CSS Variables
    const cssVariables: CSSCustomProperties = {
      '--input-width': fullWidth ? '100%' : typeof width === 'number' ? `${width}px` : width,
      ...style,
    };

    return (
      <div className={classNames(styles.InputRoot, className)} style={cssVariables as CSSProperties}>
        {/* Label Area */}
        {label && (
          <label htmlFor={inputId} className={styles.Label}>
            {label}
          </label>
        )}

        {/* Input Container (Border) */}
        <div className={styles.InputWrapper} data-status={status} data-disabled={disabled}>
          {prefix && <span className={styles.Prefix}>{prefix}</span>}

          <input ref={ref} id={inputId} className={styles.NativeInput} disabled={disabled} {...props} />

          {suffix && <span className={styles.Suffix}>{suffix}</span>}
        </div>

        {/* Helper Text Area */}
        {helperText && (
          <span className={styles.HelperText} data-status={status}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
