'use client';

import { useModal } from '@/store/modalStore';

const Modal = () => {
  const { modal, setModal } = useModal();

  return <div className={`${modal ? 'fixed' : 'hidden'}`}>Modal</div>;
};

export default Modal;
