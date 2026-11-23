import { type ReactNode } from 'react';
import styles from './CardsModal.module.css';
import GameButton from './GameButton';
import Modal from './Modal';

export type CardsModalBackButton = {
  onClick: () => void;
  label?: ReactNode;
};

export type CardsModalProps = {
  isOpen: boolean;
  className?: string;
  overlayClassName?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  backButton?: CardsModalBackButton;
};

const CardsModal = ({
  isOpen,
  className,
  overlayClassName,
  eyebrow,
  title,
  description,
  children,
  footer,
  backButton,
}: CardsModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={overlayClassName}
      className={[styles.modal, backButton ? styles.withBack : '', className].filter(Boolean).join(' ')}
    >
      {backButton && (
        <div className={styles.backRow}>
          <GameButton type="back" onClick={backButton.onClick} label={backButton.label} />
        </div>
      )}
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {children !== undefined && children !== null && children !== false && (
        <div className={styles.cards}>{children}</div>
      )}
      {footer !== undefined && footer !== null && footer !== false && (
        <div className={styles.footer}>{footer}</div>
      )}
    </Modal>
  );
};

export default CardsModal;
