import type { ReactNode } from 'react';
import React, { useEffect, useCallback } from 'react';
// Sub-components
import { ModalBackdrop } from './components/Backdrop/Backdrop';
import { ModalContent } from './components/Content/Content';
import { ModalTrigger } from './components/Trigger/Trigger'; // [추가]
import { ModalContext } from '@/shared/headless/Modal/Modal';
import { Portal } from '../Portal/Portal';

export interface ModalProps {
  value: boolean;
  onChange: (value: boolean) => void;
  children: ReactNode;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
}

const ModalMain = ({ value: isOpen, onChange, children, closeOnEsc = true, lockScroll = true }: ModalProps) => {
  // 핸들러 정의 (메모이제이션 권장)
  const handleOpen = useCallback(() => onChange(true), [onChange]);
  const handleClose = useCallback(() => onChange(false), [onChange]);

  // 1. ESC Key Logic
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, handleClose]);

  // 2. Body Scroll Lock Logic
  useEffect(() => {
    if (!lockScroll) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, lockScroll]);

  return (
    // onOpen 추가 전달
    <ModalContext.Provider value={{ isOpen, onOpen: handleOpen, onClose: handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

// [추가] Trigger 합성
export const Modal = Object.assign(ModalMain, {
  Portal,
  Trigger: ModalTrigger,
  Backdrop: ModalBackdrop,
  Content: ModalContent,
});

export default Modal;
