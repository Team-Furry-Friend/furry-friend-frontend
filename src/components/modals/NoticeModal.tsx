'use client';

interface NoticeModal {
  text: string;
  onClose?: () => void;
}

const NoticeModal = ({ onClose, text }: NoticeModal) => {
  return (
    <div className='flex flex-col'>
      <div className='p-2 md:p-4 flex flex-col gap-4 items-center'>
        <h2 className='font-bold text-xl'>알림</h2>
        <p>{text}</p>
      </div>
      <button
        className='bg-blue-400 py-2 text-white font-bold'
        id='close'
        onClick={onClose}
      >
        확인
      </button>
    </div>
  );
};

export default NoticeModal;
