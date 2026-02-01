import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from '../../Tab.module.scss';
import { useTabContext } from '@/shared/headless/Tab/Tab';

export interface TabTriggerProps {
  value: string; // 이 탭의 고유 ID
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const TabTrigger = ({ value, children, className, disabled }: TabTriggerProps) => {
  const { value: selectedValue, onChange } = useTabContext();
  const isActive = selectedValue === value;

  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={classNames(styles.Trigger, className)}
      onClick={handleClick}
      data-state={isActive ? 'active' : 'inactive'}
      data-disabled={disabled}
    >
      {children}
    </button>
  );
};
