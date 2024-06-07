import React, { useContext, useState } from 'react'
import login from '../image/undraw_online_ad_re_ol62.svg'
import User from '../image/User.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye , FaEyeSlash } from "react-icons/fa";
import UserLink from '../commen/index'
import { toast } from 'react-toastify'
import context from '../context/index'


const Login = () => {
  const[password,setPassword]=useState(true)
  const { fetchUserData } = useContext(context);

  const history = useNavigate()
  const heardClick = ()=>{
    setPassword(!password)
  }
  const [datas ,  setData] = useState({ email:'', password:''})

  const headerChange = (e)=>{
    const{name , value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const headerSubmit = async(e)=>{
    e.preventDefault()

    try{
       const dataRepresent = await fetch(UserLink.login.url ,{
         method: UserLink.login.method,
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(datas),
         credentials: 'include' 
       })
       if(!dataRepresent){
         throw new Error('Faild to login. Please try again')
       }
       const data = await dataRepresent.json()
        
       if(data.success){
        toast.success('Login successful!') 
        history('/')
        fetchUserData()
      }else{
        toast.error(data.message || 'Email is not Found');
      }
    }catch(error){
       console.log(error)
 
    }
  }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-400'>
    <div className='flex justify-around  mx-auto items-center py-10'>
      <div className='hidden md:block'>
        <img src={login} alt="" className=''/>
      </div>
         <div className='mx-auto container p-4'>
        <div className='bg-white p-6 w-full max-w-sm mx-auto rounded-lg shadow-md'>
          <div className='w-20 h-20 mx-auto mb-4'>
            <img src={User} alt='User Icon' className='rounded-full'/>
          </div>

          <form className='pt-6' onSubmit={headerSubmit}>
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

            <Link to='/forgetPassword' className='block w-fit ml-auto text-sm hover:underline hover:text-red-600 mb-4'>
              Forget password
            </Link>

            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-transform mx-auto block'>
              Login
            </button>
          </form>

          <p className='my-5 text-center'>
            Don't have an account?
            <Link to='/sigUp' className='text-red-600 hover:text-red-700 hover:underline ml-1'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
