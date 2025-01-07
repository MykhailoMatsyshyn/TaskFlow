import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import useModalStore from "../../stores/modalStore";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  // Закриття модального вікна при натисканні клавіші Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Очищення слухача при демонтажі компонента
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, onClose]);

  // Закриття модального вікна при натисканні за межі
  // Закриття модального вікна при натисканні за межі
  const onWrapperClick = (event: React.MouseEvent) => {
    // Якщо клік стався на фоні (зовнішній контейнер), закриваємо модальне вікно
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${styles["modal--entering"]}`}
      onClick={onWrapperClick}
    >
      <div className={styles["modal-wrapper"]}>
        <div className={styles["modal-content"]}>
          <button className={styles["modal-close-button"]} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
