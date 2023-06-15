'use client';

import { useModal } from '@/store/modalStore';
import { MouseEventHandler } from 'react';

// If you want to add close button, create any html element with id='close'
const Modal = () => {
  const { modal, setModal } = useModal();

  const handleClose: MouseEventHandler<HTMLElement> = e => {
    if (!(e.target instanceof Element)) return;

    if (e.target === e.currentTarget || e.target.id === 'close') {
      setModal(null);
    }
  };

  return (
    <div
      className={`${
        modal ? 'fixed' : 'hidden'
      } z-10 bg-black/50 w-full h-full flex justify-center items-center p-2 md:p-4`}
      onClick={handleClose}
    >
      <div className='bg-white rounded max-w-xl w-full'>{modal}</div>
    </div>
  );
};

export default Modal;
