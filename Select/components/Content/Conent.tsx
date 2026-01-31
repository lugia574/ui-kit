import React from 'react';
import classNames from 'classnames';
import styles from '../../Select.module.scss';
import { useSelectContext } from '@/shared/headless/Select/Select';

export interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectContent = ({ children, className }: SelectContentProps) => {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return <div className={classNames(styles.Content, className)}>{children}</div>;
};
