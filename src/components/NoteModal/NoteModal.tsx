import { useEffect } from 'react';
import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';
import { createPortal } from 'react-dom';

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    function handleEscCloser(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscCloser);
    return () => {
      document.removeEventListener('keydown', handleEscCloser);
    };
  }, [onClose]);

  function handleClickCloser(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const modal = (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClickCloser}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
