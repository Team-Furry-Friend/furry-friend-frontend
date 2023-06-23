'use client';

interface NoticeModalProps {
  texts: string[];
  onClose?: () => void;
}

const NoticeModal = ({ onClose, texts }: NoticeModalProps) => {
  return (
    <div className='flex flex-col'>
      <div className='p-2 md:p-4 flex flex-col gap-4 items-center'>
        <h2 className='font-bold text-xl'>알림</h2>
        <ul className='flex flex-col gap-2 text-center'>
          {texts.map(text => (
            <li key={text}>{text}</li>
          ))}
        </ul>
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
