import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import "./CustomModal.scss";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  const checkScrollbar = () => {
    if (contentRef.current) {
      setHasScrollbar(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(checkScrollbar, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", checkScrollbar);
    return () => window.removeEventListener("resize", checkScrollbar);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(3px)",
          zIndex: 99,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "20px 30px",
          borderRadius: "10px",
          animation: "scaleIn 0.3s ease-out forwards",
          backgroundColor: "var(--neutral-bg)",
          boxShadow: "0px 0px 1px 2px rgba(190, 219, 176, 0.5)",
          border: "none",
          overflow: "hidden",
          width: "80vw", // Автоматична ширина
          maxWidth: "430px", // Максимальна ширина для великих екранів
          minWidth: "300px", // Мінімальна ширина для мобільних
        },
      }}
    >
      <div className="custom-modal text-text w-full">
        {title && <h2 className="custom-modal__title">{title}</h2>}

        <div
          ref={contentRef}
          className={`custom-modal__content font-medium text-sm tracking-[-0.02em] text-text custom-scrollbar ${
            hasScrollbar ? "mr-[-19px] pr-[11px]" : ""
          }`}
          style={{
            overflowY: "auto",
            maxHeight: "calc(80vh - 40px - 20px)",
          }}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
