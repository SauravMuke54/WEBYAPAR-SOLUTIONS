import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../backend";
import { isAuthenticated, signout } from "../../helper";


export default function AdminDashboard() {

    const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const [err,setErr]=useState("")
  const [success,setSuccess]=useState("")
  const [userdata,setData]=useState("")
  const [nodata,setNodata]=useState("")

  const user=isAuthenticated().data.user



  const movePage=(req,res)=>{

    navigate("/user-management")

  }
   const Logout=(req,res)=>{
    
    signout().then((data)=>{

        navigate("/admin-login")

    }).catch(err=>{
        
    })

   }
  const getUser=async(req,res)=>{

    try {
        await axios
          .get(`${API}/get-users`)
          .then((response) => {
           
           setData(response.data.data)
            
          })
          .catch((err) => {
           setNodata("No data to display")
            // return err;
          });
      } catch (err) {
        setErr(err.message);
      }


  }

  const CreateUser=async(req,res)=>{

    try {
      await axios
        .post(`${API}/signup`, {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          setSuccess("Successfully added user")
          setErr("")
          
        })
        .catch((err) => {
          console.log(err)
          setSuccess("")
          setErr(err.message);
          // return err;
        });
    } catch (err) {
      setErr(err.message);
    }

  }
   useEffect(()=>{
    getUser()
   },[])

  return (
   <div className="container-fluid">
    {user['role']==1 && <>  
    
    <div className="form-group d-flex justify-content-end container-fluid mt-2">
        <button className="btn btn-outline-dark"  onClick={Logout}>{" "}Logout{"  "}</button>
      </div>
     <div className="row vh-100">


     <div className="border border-right-30 col-lg-6 col-md-6 col-sm-12 mt-4  d-flex align-items-center justify-content-center flex-column ">
       
       <h3
         className="mb-4 mt-4"
         style={{
           fontFamily: "Poppins ",
           fontWeight: 600,
           fontSize: "35px",
           color: "#646464",
         }}
       >
         Create User
       </h3>
       {err && <div class="alert alert-danger" role="alert">
Error in adding ,{err}
</div>}
{success && <div class="alert alert-success" role="alert">
{success}
</div>}
       <div className="w-75">
         <div className="form-group mb-4">
           <label for="username" className="form-label">
             User ID
           </label>
           <input
             type="text"
             className="form-control"
             id="username"
             placeholder=""
             value={username}
             onChange={e=>setUsername(e.target.value)}
           />
         </div>

         <div className="form-group  mb-4">
           <label for="password" className="form-label">
             Password
           </label>
           <input
             type="password"
             className="form-control"
             id="password"
             placeholder=""
             value={password}
             onChange={e=>setPassword(e.target.value)}
           />
         </div>

         <div className="form-group mb-4">
           <button  className="btn btn-primary w-100" onClick={CreateUser}>
             Submit
           </button>
         </div>
       </div>
     </div>
   <div className=" border border-right-30 col-lg-6 col-md-6 col-sm-12 mt-4  d-flex align-items-center justify-content-center flex-column">
       <h3
         className="mb-4 "
         style={{
           fontFamily: "Poppins",
           fontWeight: 600,
           fontSize: "35px",
           color: "#646464",
         }}
       >
         View User
       </h3>
       {userdata &&
       <div className="container w-75">
{userdata[0] && <div className="form-group position-relative mb-4 p-5" style={{ backgroundColor: "#EAECFF" }}>
 <span className="position-absolute top-0 end-0 bg-primary text-white p-1 rounded-circle m-2">1</span>
 <input
   type="text"
   className="form-control"
   id="text1"
   value={userdata[0].username}

   readOnly
 />
</div>
}
{userdata[1] && 
<div className="form-group position-relative mb-4 p-5" style={{ backgroundColor: "#EAECFF" }}>
 <span className="position-absolute top-0 end-0 bg-primary text-white p-1 rounded-circle m-2">2</span>
 <input
   type="text"
   className="form-control"
   id="text"
   value={userdata[1].username}

   readOnly
 />
</div>
}

<div className="form-group d-flex justify-content-end">
 <button className="btn btn-primary w-25" onClick={movePage}>View</button>
</div>
</div>}
{!userdata &&  <div class="alert alert-danger" role="alert">
No data to display
</div>}



     </div>
   </div></>
}
 </div>
  );
}
