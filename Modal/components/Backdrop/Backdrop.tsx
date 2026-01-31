import React from 'react';
import classNames from 'classnames';
import styles from '../../Modal.module.scss';
import { useModalContext } from '@/shared/headless/Modal/Modal';

export interface ModalBackdropProps {
  className?: string;
}

export const ModalBackdrop = ({ className }: ModalBackdropProps) => {
  const { isOpen, onClose } = useModalContext();

  if (!isOpen) return null;

  return (
    <div
      className={classNames(styles.Backdrop, className)}
      onClick={onClose} // 배경 클릭 시 닫힘
      aria-hidden="true"
    />
  );
};
