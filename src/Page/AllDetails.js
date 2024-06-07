import React , {useState , useEffect} from 'react'
import UserLink from '../commen/index'
import UploadPaper from '../Page/UploadPaper'
import AdminProduct from '../Page/AdminProduc.js'

const AllDetails = () => {
  const [uploadProduct , setUploadProduct] = useState(false)
  const [allProduct , setallProduct] = useState([])

  const fetchAllproduct = async() =>{
   
      const reponse = await fetch(UserLink.getPaper.url)
      const dataResponse = await reponse.json()
      console.log("product",dataResponse)
      setallProduct(dataResponse?.data || [])
      
  }
   
  useEffect(()=>{
    fetchAllproduct()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center '>
        <h2 className = 'font-bold text-lg'>All Paper</h2>
        <button onClick={()=>setUploadProduct(true)}  className='border-2 p-2 border-slate-900 text-slate-900 hover:text-white hover:bg-slate-900 rounded-full py-1 px3 transition'>Upload Paper</button>
      </div>


      <div className='flex items-center flex-wrap h-full gap-5 py-4 drop-shadow-md'> 
            {
              allProduct.map((product , index)=>{
                return(
                  <AdminProduct data={product} key ={index} fetchdata={fetchAllproduct}/>
                )
              })
            }
      </div>
      {
        uploadProduct &&(
          <UploadPaper onClose={()=>setUploadProduct(false)} fetchdata={fetchAllproduct} />
        )
      }
    </div>
  )
}

export default AllDetails
