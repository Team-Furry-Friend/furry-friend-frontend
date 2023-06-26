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
    <button onClick={onClick} className='flex gap-2 items-center rounded-full'>
      <BsSearch size={20} />
      <span className='hidden md:block'>검색</span>
    </button>
  );
};

export default SearchBtn;
