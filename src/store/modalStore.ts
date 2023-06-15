import { ReactNode } from 'react';
import { create } from 'zustand';

type Modal = {
  title: string;
  content: ReactNode;
};

type ModalStore = {
  modal: Modal | null;
  setModal: (modal: Modal | null) => void;
};

export const useModal = create<ModalStore>(set => ({
  modal: null,
  setModal: modal => set({ modal }),
}));
