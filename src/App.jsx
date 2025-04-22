import {useState,useEffect, useCallback } from 'react';
import './App.css'

function App() {
  const [data,setData] = useState(null)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")

  const handleForm = async (e)=>{
    e.preventDefault();
    if(!name || !email || !message){
      alert("Please fill all the fields");
      return;
    }
    await fetch('https://task-30-backend-seven.vercel.app/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email, message }),
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      // console.log(typeof data)
     
      setData({
        name: data.data.name
        ,email:data.data.email,
        message:data.data.message
      });
      setEmail("");
      setName("");
      setMessage("");
    })
    .catch(err => console.log(err))
  }


  return (
    <>
     <div className='w-full h-full min-h-screen gap-4 p-10 bg-[#1A1A1A] text-gray-300 flex flex-col items-center '>
      <h1 className='text-3xl font-bold'>Form</h1>
      <form onSubmit={handleForm} className='flex flex-col justify-center items-center gap-5 border-2 border-gray-100 p-4 rounded-md w-[50vw]'>
        <input type='text'  placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)} className='border-1 w-full rounded-md p-3 text-xl'/>
        <input type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border-1 w-full rounded-md p-3 text-xl'/>
        <input type='text' placeholder='Enter your message'value={message} onChange={(e)=>setMessage(e.target.value)} className='border-1 w-full rounded-md p-3 text-xl'/>
        <button className='rounded-md border-2 w-fit p-3 cursor-pointer bg-gray-300 text-black font-bold'>Submit</button>
      </form>


      <table className='w-[50vw] border-2 border-gray-100 text-left p-3'>
        <thead>
          <tr className=' border-gray-100 p-4'>
            <th className='p-3 border-2'>Name</th>
            <th className='p-3 border-2'>Email</th>
            <th className='p-3 border-2'>Message</th>
          </tr>
        </thead>
        <tbody>
          {
            data && (
              <tr  className=' border-gray-100 p-4'>
              <td className='p-3 border-2'>{data.name}</td>
              <td className='p-3 border-2'>{data.email}</td>
              <td className='p-3 border-2'>{data.message}</td>
            </tr>
            )
          }
        </tbody>
      </table>
      
      {/* <div className='w-[50vw]  border-2 flex flex-col gap- border-gray-100'>
        {
          data && data.map((item,i)=>{
            return(
              <div key={i} className='border-b-2 flex gap-3 border-gray-100 p-2'>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>{item.message}</p>
              </div>
            )
          })
        }
      </div> */}
     </div>

    </>
  )
}

export default App
