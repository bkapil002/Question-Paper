import React from 'react';
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ imgeUrl, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
      <div className='relative bg-white p-4 rounded shadow-lg'>
        <button className='absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full hover:bg-red-700' onClick={onClose}>
          <IoClose className='text-xl' />
        </button>
        <img alt='Display' src={imgeUrl} className='h-full w-80 object-contain' />
      </div>
    </div>
  );
};

export default DisplayImage;