import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from '../../Tab.module.scss';

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export const TabList = ({ children, className }: TabListProps) => {
  return (
    <div className={classNames(styles.List, className)} role="tablist">
      {children}
    </div>
  );
};
