import { useModalContext } from '@/shared/headless/Modal/Modal';
import type { ReactElement, MouseEventHandler } from 'react';
import React from 'react';

export interface ModalTriggerProps {
  children: ReactElement;
}

export const ModalTrigger = ({ children }: ModalTriggerProps) => {
  const { onOpen } = useModalContext();

  // [수정] 자식의 props 타입을 구체적으로 명시 (onClick이 있을 수 있음)
  const child = React.Children.only(children) as ReactElement<{
    onClick?: MouseEventHandler;
  }>;

  return React.cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      // 이제 child.props.onClick에 접근해도 에러가 나지 않습니다.
      child.props.onClick?.(e);
      onOpen();
    },
  } as React.HTMLAttributes<HTMLElement>);
};
