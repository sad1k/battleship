
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'
import { ReactNode, SetStateAction } from 'react';

interface IProps{
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const Modal = ({open,  setOpen, children}: IProps) => {
  if(!open) return null
  
  return createPortal(
    <>
    <div className={styles.overlay}></div>
    <div className={styles.modal}>
      <div className={styles.content}>
      <button onClick={() => setOpen(false)}>Close modal</button>
      {children}
      </div>
    </div>
    </>,
    document.getElementById('portal') as Element
  );
};
