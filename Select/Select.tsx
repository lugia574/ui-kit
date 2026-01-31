import type { ReactNode } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';

// Sub-components Imports
import { SelectDisplay } from './components/Display/Display';
import { SelectItem } from './components/Item/Item';

// CSS Variable Type
import type { CSSProperties } from 'react';
import { SelectContext } from '@/shared/headless/Select/Select';
import { SelectContent } from './components/Content/Conent';
interface CSSCustomProperties extends CSSProperties {
  '--select-width'?: string;
}

interface SelectProps {
  value: any;
  onChange: (value: any) => void;
  children: ReactNode;
  className?: string;
  width?: string | number;
  style?: CSSProperties;
}

const SelectMain = ({ value, onChange, children, className, width, style }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click Outside: 메뉴 밖을 클릭하면 닫히게 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const cssVariables: CSSCustomProperties = {
    '--select-width': typeof width === 'number' ? `${width}px` : width,
    ...style,
  };

  return (
    <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
      <div ref={containerRef} className={classNames(styles.Root, className)} style={cssVariables as CSSProperties}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

// Compound Component 패턴 적용
export const Select = Object.assign(SelectMain, {
  Display: SelectDisplay,
  Content: SelectContent,
  Item: SelectItem,
});

export default Select;
