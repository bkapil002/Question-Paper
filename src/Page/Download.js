import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchChatagery from '../helps/fetchChatagery';
import { FaDownload } from "react-icons/fa6";

const Download = () => {
  const { subject } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {       
    const categoryProduct = await fetchChatagery(subject); 
    setData(categoryProduct?.data);
  };

  useEffect(() => {    
    fetchData();
  }, [subject]);

  const handleDownloadAll = async (images) => {
    for (const url of images) {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = url.split('/').pop(); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className='flex drop-shadow-md justify-around  justify- gap-4  items-center p-3 flex-wrap'>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className='bg-white p-2 h-35 rounded flex'>
            <div className=' w-auto'>
              <div className='w-32 h-28 flex justify-center items-center'>
                <img src={item?.paper[0]} alt='' className='mx-auto object-fill h-full w-full'/>
              </div>
              <h2 className='text-ellipsis line-clamp-2'>{item.subject}</h2>
              <h2 className='text-ellipsis line-clamp-2'>{item.year}</h2>
              <h2 className='text-ellipsis line-clamp-2'>{item.semester}</h2>
              <div className=''>
                <div  onClick={() => handleDownloadAll(item.paper)} className='w-fit ml-auto cursor-pointer p-2 rounded-full border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'>
                  <FaDownload/>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No data found for the selected subject.</div>
      )}
    </div>
  );
}

export default Download;
