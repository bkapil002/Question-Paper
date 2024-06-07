import React, { useEffect ,useState } from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import  UserLink from '../commen/index'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { setUserData } from '../store/userSlice';
import { MdDelete } from "react-icons/md";
import UpdateAdminProduct from '../Page/UpdateAdminProduct'


const AdminProduc = ({data , fetchdata}) => {
    const[editProduct ,setEditProduct] = useState(false)
   const dispatch = useDispatch
    const headerDelete = async(paperId)=>{
    
        try{
           const require = await fetch(`${UserLink.DeletePaper.url}/${paperId}` ,{
            method:UserLink.DeletePaper.method,
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            
           })

           const data =  await require.json()

           if(data.success){
               toast.success(data.message)
               dispatch(setUserData())
               fetchdata()
           }
        }catch(error){

        }
    }

    useEffect(()=>{
        
        headerDelete()
    },[])
  return (
    <div>
      <div>
      <div className='bg-white p-4 rounded'>
      <div className='w-40'>
      <div className='w-32 h-23 flex justify-center items-center'>
      <img src={data?.paper[0]} alt='' className='mx-auto object-fill h-full'/>

      </div>
        <h2 className='text-ellipsis line-clamp-2'>{data.subject}</h2>
        <h2 className='text-ellipsis line-clamp-2'>{data.year}</h2>
        <h2 className='text-ellipsis line-clamp-2'>{data.semester}</h2>

           <div className='flex  gap-10 '>
           <div onClick={() => headerDelete(data._id)}  className ='w-fit  cursor-pointer p-2  rounded-full border-slate-900 text-red-700 hover:bg-slate-900  hover:text-red-500'  >
        <MdDelete />
        </div>
           <div onClick={()=>setEditProduct(true)} className ='w-fit ml-auto cursor-pointer p-2  rounded-full border-slate-900 text-slate-900 hover:bg-slate-900  hover:text-white'  >
        <RiEdit2Fill/>
        </div>
        
           </div>

        
      </div>
      </div>
      
    </div>
    {
        editProduct &&(
            <UpdateAdminProduct deltails={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
        )
    }
    </div>
  )
}

export default AdminProduc
