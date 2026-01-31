// Portal.tsx
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  container?: HTMLElement; // 기본값: document.body
}

export const Portal = ({ children, container }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof document === 'undefined' || !mounted) return null;

  const target = container || document.body;
  return ReactDOM.createPortal(children, target);
};
