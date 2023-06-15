import { ReactNode } from 'react';
import { create } from 'zustand';

type ModalStore = {
  modal: ReactNode | null;
  setModal: (modal: ReactNode | null) => void;
};

export const useModal = create<ModalStore>(set => ({
  modal: null,
  setModal: modal => set({ modal }),
}));
