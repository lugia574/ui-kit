import type { CSSProperties, ElementType } from 'react';
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Grid.module.scss';

// Utils
import type { SpacingSize } from '@/shared/types/css/SpacingSize';
import { toCssUnit } from '@/shared/utils';
import { toCssSpacing } from '@/shared/utils/css/toCssPadding';

interface CSSCustomProperties extends CSSProperties {
  '--grid-columns'?: string;
  '--grid-rows'?: string;
  '--grid-gap'?: string;
  '--grid-flow'?: string;
  '--grid-align'?: string;
  '--grid-justify'?: string;
  '--grid-align-content'?: string;
  '--grid-justify-content'?: string;
  '--grid-width'?: string;
  '--grid-height'?: string;
  '--grid-padding'?: string;
}

interface GridProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: React.ReactNode;

  // Layout
  columns?: number | string; // 숫자면 repeat(n, 1fr), 문자면 그대로
  rows?: number | string;
  gap?: number | string;
  flow?: CSSProperties['gridAutoFlow'];

  // Alignment (Item)
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyItems'];

  // Alignment (Content)
  alignContent?: CSSProperties['alignContent'];
  justifyContent?: CSSProperties['justifyContent'];

  // Size & Spacing
  width?: number | string;
  height?: number | string;
  padding?: SpacingSize | number | string;
}

// 컬럼/로우 값을 CSS grid-template 값으로 변환하는 헬퍼
const toGridTemplate = (value?: number | string) => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') {
    return `repeat(${value}, 1fr)`;
  }
  return value;
};

const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      style,

      columns,
      rows,
      gap,
      flow,

      align,
      justify,
      alignContent,
      justifyContent,

      width,
      height,
      padding,

      ...props
    },
    ref
  ) => {
    const cssVariables: CSSCustomProperties = {
      '--grid-columns': toGridTemplate(columns),
      '--grid-rows': toGridTemplate(rows),
      '--grid-gap': toCssUnit(gap || 0),
      '--grid-flow': flow,

      '--grid-align': align,
      '--grid-justify': justify,
      '--grid-align-content': alignContent,
      '--grid-justify-content': justifyContent,

      '--grid-width': toCssUnit(width),
      '--grid-height': toCssUnit(height),
      '--grid-padding': padding ? toCssSpacing(padding) : undefined,

      ...style,
    };

    return (
      <Component
        ref={ref}
        className={classNames(styles.Grid, className)}
        style={cssVariables as CSSProperties}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
