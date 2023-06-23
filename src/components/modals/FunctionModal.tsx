'use client';

interface FunctionModalProps {
  texts: string[];
  handler: () => void;
  disabled?: boolean;
}

const FunctionModal = ({ handler, texts, disabled }: FunctionModalProps) => {
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
      <div className='flex'>
        <button
          className='w-1/2 bg-blue-400 py-2 text-white font-bold'
          id='close'
        >
          취소하기
        </button>
        <button
          onClick={handler}
          className='w-1/2 bg-red-400 disabled:bg-gray-200 py-2 text-white font-bold'
          disabled={disabled}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default FunctionModal;
