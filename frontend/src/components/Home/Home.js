import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home () {

    const navigate=useNavigate()
    
    const goToAdmin=()=>{

        navigate("/admin-login")

    }

    const goToUser=()=>{
        navigate("/user-login")
    }



    return (
    <div>
       
   <div className='vh-100 d-flex align-items-center justify-content-center'>
    <div className='col text-center border border-primary p-5'  >
        <h1 className='p-2 m-2'>Admin Login</h1>
        <button className='btn btn-primary' onClick={goToAdmin}>Admin Login</button>
    </div>
    <div className='col text-center border border-primary p-5'>
    <h1 className='p-2 m-2'>User Login</h1>
        <button className='btn btn-primary'  onClick={goToUser}>User Login</button>
    </div>
</div>

    </div>
  );
}
