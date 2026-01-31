import React from 'react';
import classNames from 'classnames';
import styles from '../../Select.module.scss';
import { useSelectContext } from '@/shared/headless/Select/Select';

export interface SelectItemProps {
  value: any;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const SelectItem = ({ value, children, className, disabled }: SelectItemProps) => {
  const { value: selectedValue, onChange, setIsOpen } = useSelectContext();

  const isSelected = selectedValue === value;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모로 이벤트 전파 막기
    if (disabled) return;

    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(styles.Item, className)}
      onClick={handleClick}
      data-selected={isSelected}
      data-disabled={disabled}
    >
      {children}
    </div>
  );
};
