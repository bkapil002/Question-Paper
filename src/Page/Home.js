import React from 'react';
import bgImage1 from '../image/bgImage (1).gif'; 
import bgImage2 from '../image/bgImage (2).gif'; 
import bgImage3 from '../image/bgImage (3).gif'; 
import paper from '../image/paper.png'

import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      <div className='bg-slate-800 w-full h-80'>
      <div className='w-full h-full overflow-hidden relative'>
        <img src={bgImage1} alt='' className='w-full h-full object-cover absolute top-0 left-0'/>
        <div className='absolute inset-0 flex flex-col justify-center items-center z-10 text-white text-center'>
          <img src={paper} className='w-16 ' alt=''/>
          <h2>BSe</h2>
          <Link to={'/downloade/Bsc-Maths'} className='hover:underline  underline-offset-1 hover:text-red-700 hover:text-1xl  cursor-pointer'>Click Here..</Link>
        </div>
      </div>
      </div>
      <div className='bg-slate-800 w-full h-80'>
      <div className='w-full h-full overflow-hidden relative'>
        <img src={bgImage2} alt='' className='w-full h-full object-cover absolute top-0 left-0'/>
        <div className='absolute inset-0 flex flex-col justify-center items-center z-10 text-white text-center'>
          <img src={paper} className='w-16 ' alt=''/>
          <h2>Bsc</h2>
          <Link to={'/downloade/Bsc'} className='hover:underline  underline-offset-1 hover:text-red-700 hover:text-1xl  cursor-pointer'>Click Here..</Link>
        </div>
      </div>
      </div>
      <div className='bg-slate-800 w-full h-80'>
      <div className='w-full h-full overflow-hidden relative'>
        <img src={bgImage3} alt='' className='w-full h-full object-cover absolute top-0 left-0'/>
        <div className='absolute inset-0 flex flex-col justify-center items-center z-10 text-white text-center'>
          <img src={paper} className='w-16 ' alt=''/>
          <h2>BCA</h2>
          <Link to={'/downloade/BCA'} className='hover:underline  underline-offset-1 hover:text-red-700 hover:text-1xl  cursor-pointer'>Click Here..</Link>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
