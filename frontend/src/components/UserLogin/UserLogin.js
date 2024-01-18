import React, { useState } from "react";
import logo from "./logo.svg";
import backgroundImage from "./background.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../backend";
import { authenticate } from "../../helper";



export default function UserLogin() {

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const [err,setErr]=useState("")
    const [success,setSuccess]=useState("")
    const [userdata,setData]=useState("")
    const [nodata,setNodata]=useState("")

    
    
    
  const Login=async(req,res)=>{

    try {
      await axios
        .post(`${API}/signin`, {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          // return response.data;
          // setSuccess("Signed in Successfully");
          authenticate(response, () => {
            navigate("/user-dashboard");
          });
        })
        .catch((err) => {
          console.log(err)
          setErr(err.message);
          // return err;
        });
    } catch (err) {
      setErr(err.message);
    }

  }

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div
          className="col-lg-8 col-md-8 col-sm-12  d-flex align-items-center justify-content-center p-5"
          style={{ backgroundColor: " #00008B", backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center" }}
        >
          
           
              <img src={logo} className="img-fluid" alt="Logo" />
            
               </div>
        <div className="col-lg-4 col-md-4 col-sm-12   d-flex align-items-center justify-content-center flex-column">
       
            <h3 className="mb-lg-4 " style={{fontFamily:"Poppins",fontWeight:600,fontSize:"35px",color:"#646464"}}>User Login</h3>

            {err && <div class="alert alert-danger" role="alert">
Error in login , Please Retry or Contact Admin
</div>}

<input type="text" className="form-control w-75 mb-4" placeholder="User ID" value={username} onChange={e=>{setUsername(e.target.value)}} />
            <input type="password" className="form-control w-75 mb-4" placeholder="Password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
            <button type="button" className="btn btn-primary w-75 btn-block" onClick={Login}>Login</button>
    
         
        </div>
      </div>
    </div>
  );
}
