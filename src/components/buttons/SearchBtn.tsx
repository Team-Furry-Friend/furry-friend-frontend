'use client';

import { BsSearch } from 'react-icons/bs';
import { useModal } from '@/store/modalStore';
import SearchModal from '@/components/modals/SearchModal';

const SearchBtn = () => {
  const setModal = useModal(s => s.setModal);

  const onClick = () => {
    setModal(<SearchModal />);
  };

  return (
    <button
      onClick={onClick}
      className='h-full flex gap-2 px-2 md:px-4 items-center bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600'
    >
      <BsSearch size={20} />
      <span className='hidden md:block w-8'>검색</span>
    </button>
  );
};

export default SearchBtn;
