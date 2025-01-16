import React from "react";
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      // ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(3px)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          animation: "scaleIn 0.3s ease-out forwards",
          backgroundColor: "#151515",
          boxShadow: "0px 0px 1px 2px rgba(190, 219, 176, 0.5)",
          border: "none",
          overflow: "hidden",
          maxHeight: "80vh",
        },
      }}
    >
      <div className="custom-modal text-white">
        {/* <button className="custom-modal__close" onClick={onClose}>
          &times;
        </button> */}
        {title && <h2 className="custom-modal__title">{title}</h2>}
        <div
          className="custom-modal__content"
          style={{
            overflowY: "auto", // Скрол для вмісту, якщо він завеликий
            maxHeight: "calc(80vh - 40px)", // Врахування padding для заголовка
          }}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
