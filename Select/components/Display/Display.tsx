import React from 'react';
import classNames from 'classnames';
import styles from '../../Select.module.scss';
import { useSelectContext } from '@/shared/headless/Select/Select';

export interface SelectDisplayProps {
  placeholder?: string;
  render?: (value: any) => React.ReactNode; // 값을 커스텀하게 보여줄 때 사용
  className?: string;
}

export const SelectDisplay = ({ placeholder, render, className }: SelectDisplayProps) => {
  const { isOpen, setIsOpen, value } = useSelectContext();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const displayText = value != null ? (render ? render(value) : value) : placeholder;

  return (
    <div
      className={classNames(styles.Display, className)}
      onClick={handleToggle}
      data-state={isOpen ? 'open' : 'closed'}
      data-placeholder={value == null}
    >
      <span className={styles.DisplayText}>{displayText}</span>
      <span className={styles.Icon} /> {/* 화살표 아이콘 영역 */}
    </div>
  );
};
