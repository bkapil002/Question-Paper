import React, { useState } from 'react';
import uploadimage from '../helps/uploadimage';
import UserLink from '../commen/index';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import catagorys from '../helps/Chatagery';
import DisplayImage from '../helps/DisplayImage';
import semesters from '../helps/semester'

const UploadPaper = ({ onClose, fetchdata }) => {
  const [data, setData] = useState({
    subject: '',
    year: '',
    semester: '',
    paper: [],
  });

  const headerUpoade = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const [fullOpenImage, setfullOpenImage] = useState(false);
  const [fullScreen, setFullScreen] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const uploadedPaper = await uploadimage(file);
    setData((prevData) => ({
      ...prevData,
      paper: [...prevData.paper, uploadedPaper.url],
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedPapers = [...data.paper];
    updatedPapers.splice(index, 1);
    setData((prevData) => ({
      ...prevData,
      paper: updatedPapers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(UserLink.uplaodePaper.url, {
        method: UserLink.uplaodePaper.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const dataJson = await dataResponse.json();
      if(dataJson.success){
        toast.success(dataJson?.message);
        onClose()
        fetchdata()
      }


      if(dataJson.error){
        toast.error(dataJson?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-10'>
      <div className='bg-white rounded p-4 w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'>Upload Paper</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoClose />
          </div>
        </div>
        <form className='grid p-4 gap-1 overflow-y-scroll h-full pb-5'>
          <label htmlFor='subject'>Subject</label>
          <select
            value={data.subject}
            className='p-2 bg-slate-100 border rounded'
            id='subject'
            name='subject'
            onChange={headerUpoade}
            required
          >
            {catagorys.map((el, index) => (
              <option value={el.value} key={el.value + index} >
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor='year'>Year</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='text'
            id='year'
            name='year'
            list='yearList'
            placeholder='Year'
            value={data.year}
            onChange={headerUpoade}
            required
          />
          <datalist id='yearList'>
            {years.map((year, index) => (
              <option key={index} value={year} />
            ))}
          </datalist>

          <label htmlFor='semester'>Semester</label>
          <select
            value={data.semester}
            className='p-2 bg-slate-100 border rounded'
            id='semester'
            name='semester'
            onChange={headerUpoade}
            required
          >
            {semesters.map((el, index) => (
              <option value={el.value} key={el.value + index} >
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor='paper'>Paper</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center'>
              <div className='text-slate-500 items-center flex flex-col gap-2 justify-center'>
                <span className='text-3xl cursor-pointer'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Paper Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleImageUpload} />
              </div>
            </div>
          </label>

          <div>
            {data.paper.length > 0 ? (
              <div className='flex items-center gap-2'>
                {data.paper.map((el, index) => (
                  <div key={index}>
                    <img
                      src={el}
                      alt='Uploaded Paper'
                      width={80}
                      height={80}
                      className='bg-slate-100 border'
                      onClick={() => {
                        setfullOpenImage(true);
                        setFullScreen(el);
                      }}
                    />
                    <div className='right-0 bottom-0 flex justify-center text-white bg-red-600 rounded-full cursor-pointer hover:bg-red-800' onClick={() => handleDeleteImage(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>* Please upload a paper image</p>
            )}
          </div>

          <button onClick={handleSubmit} className='px-2 py-3 bg-red-600 text-white max-h-10 hover:bg-red-700 justify-center rounded flex'>
            Upload Paper
          </button>
        </form>
      </div>
      {fullOpenImage && (
        <DisplayImage imgeUrl={fullScreen} onClose={() => setfullOpenImage(false)} />
      )}
    </div>
  );
};

export default UploadPaper;
