import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from '../../Tab.module.scss';
import { useTabContext } from '@/shared/headless/Tab/Tab';

export interface TabContentProps {
  value: string; // 이 컨텐츠가 속한 탭 ID
  children: ReactNode;
  className?: string;
  keepMounted?: boolean; // 비활성화되어도 DOM에 유지할지 여부 (SEO 등 고려)
}

export const TabContent = ({ value, children, className, keepMounted = false }: TabContentProps) => {
  const { value: selectedValue } = useTabContext();
  const isActive = selectedValue === value;

  // 활성화되지 않았고, DOM 유지 옵션도 없으면 렌더링 안 함
  if (!isActive && !keepMounted) return null;

  return (
    <div
      role="tabpanel"
      className={classNames(styles.Content, className)}
      // keepMounted일 때 css로 숨김 처리
      hidden={!isActive}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </div>
  );
};
