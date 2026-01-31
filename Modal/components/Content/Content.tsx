import type { CSSProperties } from 'react';
import React from 'react';
import classNames from 'classnames';
import styles from '../../Modal.module.scss';
import { useModalContext } from '@/shared/headless/Modal/Modal';

interface CSSCustomProperties extends CSSProperties {
  '--modal-max-height'?: string | number;
}

export interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string | number;
  width?: string | number;
  style?: CSSProperties;
}

export const ModalContent = ({ children, className, maxHeight, width, style }: ModalContentProps) => {
  const { isOpen } = useModalContext();

  if (!isOpen) return null;

  const cssVariables: CSSCustomProperties = {
    '--modal-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    width: typeof width === 'number' ? `${width}px` : width, // width는 직접 style로
    ...style,
  };

  return (
    <div
      className={classNames(styles.Content, className)}
      style={cssVariables as CSSProperties}
      onClick={(e) => e.stopPropagation()} // 박스 내부 클릭 시 닫힘 방지
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};
