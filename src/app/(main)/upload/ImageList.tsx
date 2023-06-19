'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { MdRemove } from 'react-icons/md';

const ImageList = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
  const handleRemove = (targetFile: File) => {
    const filteredFiles = files.filter(file => file.name !== targetFile.name);

    setFiles(filteredFiles);
  };

  if (files.length === 0) {
    return (
      <div>
        <p className='text-center font-bold py-4'>이미지를 업로드해주세요.</p>
      </div>
    );
  }

  return (
    <ul className='flex gap-4 flex-wrap'>
      {files.map(file => (
        <li
          key={file.name}
          className='w-[calc(50%-8px)] md:w-[calc((100%-48px)/4)] flex justify-center relative rounded-xl overflow-hidden'
        >
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            width={160}
            height={160}
            className='w-full aspect-square object-cover'
          />

          <MdRemove
            onClick={() => handleRemove(file)}
            className='text-white absolute right-2 top-2 rounded-full bg-black/50 hover:bg-black/30 border border-white cursor-pointer'
            size={32}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageList;
