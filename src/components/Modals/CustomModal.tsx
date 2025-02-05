import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

/**
 * CustomModal Component
 * A reusable modal with auto-sizing and dynamic scroll detection.
 */
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
          width: "80vw",
          maxWidth: "430px",
          minWidth: "300px",
        },
      }}
    >
      <div className="relative text-text w-full">
        {title && (
          <h2 className="m-0 pb-[5px] border-b border-[var(--text-color-transparent)] text-lg text-center mb-[14px]">
            {title}
          </h2>
        )}

        <div
          ref={contentRef}
          className={`modal-content font-medium text-sm tracking-[-0.02em] text-text custom-scrollbar ${
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
