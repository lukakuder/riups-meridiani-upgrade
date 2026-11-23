import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import styles from './Modal.module.css';
import Overlay from './Overlay';

export type ModalProps = {
  isOpen: boolean;
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
};

const Modal = ({ isOpen, className, overlayClassName, children }: ModalProps) =>
  createPortal(
    <Overlay isOpen={isOpen} blur className={[styles.overlay, overlayClassName].filter(Boolean).join(' ')}>
      <div className={`${styles.modal} ${className ?? ''}`}>{children}</div>
    </Overlay>,
    document.body,
  );

export default Modal;
