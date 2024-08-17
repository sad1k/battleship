import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { ReactNode } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, onClose, children }: IProps) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <div className={styles.content}>
          <button onClick={onClose}>Закрыть</button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal") as Element
  );
};
