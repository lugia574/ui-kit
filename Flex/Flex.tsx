import React, { CSSProperties, ElementType, forwardRef } from 'react';
import styles from './Flex.module.scss';
import classNames from 'classnames'; // *선택사항: npm install classnames

// CSS Variable을 위한 타입 확장
interface CSSCustomProperties extends CSSProperties {
  '--flex-width'?: string | number;
  '--flex-height'?: string | number;
  '--flex-direction'?: string;
  '--flex-justify'?: string;
  '--flex-align'?: string;
  '--flex-gap'?: string | number;
  '--flex-wrap'?: string;
}

interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  // 렌더링할 HTML 태그 (기본: div)
  as?: ElementType;
  children?: React.ReactNode;

  // Layout Props
  width?: string | number;
  height?: string | number;
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: string | number;
  wrap?: CSSProperties['flexWrap'];
}

// 숫자면 px 붙이고, 문자면 그대로 반환하는 간단한 내부 유틸
const toCssValue = (value?: string | number) => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      width,
      height,
      direction,
      justify,
      align,
      gap,
      wrap,
      style,
      ...props
    },
    ref,
  ) => {
    // Props를 CSS Variables로 매핑
    const cssVariables: CSSCustomProperties = {
      '--flex-width': toCssValue(width),
      '--flex-height': toCssValue(height),
      '--flex-direction': direction,
      '--flex-justify': justify,
      '--flex-align': align,
      '--flex-gap': toCssValue(gap),
      '--flex-wrap': wrap,
      ...style, // 사용자가 직접 넣은 style도 병합
    };

    return (
      <div
        ref={ref}
        className={`${styles.Flex} ${className || ''}`.trim()}
        style={cssVariables as CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export default Flex;
