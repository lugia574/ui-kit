import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

// Utils
import type { SpacingSize } from '@/shared/types/css/SpacingSize';
import { toCssSpacing } from '@/shared/utils/css/toCssPadding';

// CSS Variable 타입 확장
interface CSSCustomProperties extends CSSProperties {
  '--btn-main-color'?: string;
  '--btn-contrast-text'?: string;
  '--btn-padding'?: string;
  '--btn-radius'?: string;
  '--btn-width'?: string;
  '--btn-gap'?: string;
}

// [수정] Omit을 사용하여 HTML 기본 속성의 'prefix'를 제거합니다.
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  // Style Props
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;

  // Custom Style
  color?: string; // 메인 컬러 커스텀
  padding?: SpacingSize | number | string;
  radius?: number | string;

  // Content Slots
  prefix?: React.ReactNode; // 이제 충돌 없이 ReactNode 사용 가능
  suffix?: React.ReactNode;

  // State
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'filled',
      size = 'md',
      fullWidth = false,
      color,
      padding,
      radius,
      prefix,
      suffix,
      isLoading = false,
      className,
      style,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // CSS Variables 생성
    const cssVariables: CSSCustomProperties = {
      '--btn-main-color': color,
      '--btn-padding': padding ? toCssSpacing(padding) : undefined,
      '--btn-radius': typeof radius === 'number' ? `${radius}px` : radius,
      '--btn-width': fullWidth ? '100%' : undefined,
      ...style,
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classNames(styles.Button, className)}
        style={cssVariables as CSSProperties}
        disabled={disabled || isLoading}
        // SCSS Data Attributes
        data-variant={variant}
        data-size={size}
        data-loading={isLoading}
        {...props}
      >
        {prefix && <span className={styles.Icon}>{prefix}</span>}

        <span>{isLoading ? 'Loading...' : children}</span>

        {suffix && <span className={styles.Icon}>{suffix}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
