import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ModalStore = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
  }))
);

export default useModalStore;
