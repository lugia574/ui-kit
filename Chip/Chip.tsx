import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Chip.module.scss';
import type { SpacingSize } from '@/shared/types/css/SpacingSize';
import { toCssSpacing } from '@/shared/utils/css/toCssPadding';

// CSS Variable 타입 확장
interface CSSCustomProperties extends CSSProperties {
  '--chip-padding'?: string;
  '--chip-radius'?: string;
  '--chip-primary-color'?: string; // 메인 컬러 (텍스트/보더)
  '--chip-bg-color'?: string; // 배경 컬러
  '--chip-gap'?: string; // 아이콘과 텍스트 사이 간격
}

interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix' | 'color'> {
  label: React.ReactNode;

  // Slots
  prefix?: React.ReactNode; // 앞 아이콘
  suffix?: React.ReactNode; // 뒤 아이콘

  // Status
  variant?: 'filled' | 'outlined';
  selected?: boolean;
  disabled?: boolean;

  // Custom Styles
  padding?: SpacingSize | number | string;
  radius?: number | string;
  gap?: number | string; // 아이콘 간격 커스텀
  color?: string; // 텍스트/보더 색상 강제 지정
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      prefix,
      suffix,
      variant = 'filled',
      selected = false,
      disabled = false,
      padding,
      radius,
      gap,
      color,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    // CSS Variables 매핑
    const cssVariables: CSSCustomProperties = {
      '--chip-padding': padding ? toCssSpacing(padding) : undefined,
      '--chip-radius': typeof radius === 'number' ? `${radius}px` : radius,
      '--chip-gap': typeof gap === 'number' ? `${gap}px` : gap,

      // color prop이 들어오면 기본 색상을 덮어씁니다.
      '--chip-primary-color': color,

      ...style,
    };

    return (
      <div
        ref={ref}
        className={classNames(styles.Chip, className)}
        style={cssVariables as CSSProperties}
        data-variant={variant}
        data-selected={selected}
        data-disabled={disabled}
        onClick={!disabled ? onClick : undefined}
        {...props}
      >
        {/* Flex 컴포넌트 없이 직접 렌더링 */}
        {prefix && <span className={styles.Icon}>{prefix}</span>}

        <span className={styles.Label}>{label}</span>

        {suffix && <span className={styles.Icon}>{suffix}</span>}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;
