import React, { useState } from 'react'
import SignUp from '../image/undraw_online_ad_re_ol62.svg'
import User from '../image/User.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye , FaEyeSlash } from "react-icons/fa";
import imageTobase64 from "../helps/imageTobase64"
import UserLink from '../commen/index'
import { toast } from 'react-toastify'



const SigUp = () => {

  const [datas ,  setData] = useState({name:'' , email:'', password:'', profilepic : ''})
  const histort = useNavigate()
  const headerChange = (e)=>{
    const{name , value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }
       const headerSubmit = async(e) =>{
        e.preventDefault()
        try{
          const dataResponce = await fetch(UserLink.siginUp.url,{
            method: UserLink.siginUp.method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
          })
          if(!dataResponce){
            throw new Error('Faild to Sign Up. Please try again')
          }

          const data = await dataResponce.json()
          if(data.success){
            toast.success('Sign up successful!') 
            histort('/login')
          }else{
            toast.error(data.message || 'Email is already register');
          }
        }catch(error){
          console.log(error)
        }
       }
    const[password,setPassword]=useState(true)
    const heardClick = ()=>{
      setPassword(!password)
    }

    const headerUpadtePic = async(e) =>{
      const file = e.target.files[0]
      const base64 = await imageTobase64(file)
      console.log('File',base64)
      setData((preve)=>{
        return{
          ...preve,
          profilepic : base64
        }
      })

    }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-400'>
    <div className='flex justify-around  mx-auto items-center py-10'>
    <div className='hidden md:block'>
      <img src={SignUp} alt="" className=''/>
    </div>
       <div className='mx-auto container p-4'>
      <div className='bg-white p-6 w-full max-w-sm mx-auto rounded-lg shadow-md'>
        <div className='w-20 h-20 mx-auto mb-4'>
        <div className='w-20 h-20  mx-auto relative overflow-hidden rounded-full cursor-pointer'>
                        <div>
                          <img src={datas.profilepic || User} alt='login'/>
                        </div>  
                        <label>
                        <div className='text-xs bg-slate-200 py-2 text-center cursor-pointer  absolute bottom-0 w-full bg-opacity-90'>
                                 Photo
                        </div>
                         <input type='file' className='hidden cursor-pointer' onChange={headerUpadtePic}></input>
                        </label>
                     </div>
        </div>

        <form className='pt-6' onSubmit={headerSubmit}>
        <div className='grid mb-4'>
            <label htmlFor='email' className='mb-1'>Name:</label>
            <div className='bg-slate-100 p-2 rounded'>
              <input
                type='name'
                placeholder='name'
                name='name'
                id='name'
                onChange={headerChange}
                value={datas.name}
                required
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label htmlFor='email' className='mb-1'>Email:</label>
            <div className='bg-slate-100 p-2 rounded'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                id='email'
                onChange={headerChange}
                value={datas.email}
                required
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label htmlFor='password' className='mb-1'>Password:</label>
            <div className='bg-slate-100 p-2 rounded flex text-center items-center'>
              <input
                type={
                  password ? "password" : "text"
                }
                placeholder='Password'
                name='password'
                id='password'
                onChange={headerChange}
                value={datas.password}
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='mx-auto cursor-pointer -ml-10'>{
                password? (
                  <FaEye
                    onClick={heardClick}
                    className='text-red-600 cursor-pointer'
                  />
                ) : (
                  <FaEyeSlash
                    onClick={heardClick}
                    className='text-red-600 cursor-pointer'
                  />
                )
              }</div>
            </div>
          </div>
          <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-transform mx-auto block'>
            Sign Up
          </button>
        </form>

        <p className='my-5 text-center'>
          Do you have account?
          <Link to='/login' className='text-red-600 hover:text-red-700 hover:underline ml-1'>
            Log In
          </Link>
        </p>
      </div>
    </div>
  </div>
  </div>

  )
}

export default SigUp
