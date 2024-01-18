import React, { useState } from 'react';
import { isAuthenticated, signout } from '../../helper';
import { API } from '../../backend';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UserDashboard() {
 
    const navigate=useNavigate()
 const  user= isAuthenticated().data.user
  const [name, setName] = useState('');
  const [src, setSrc] = useState(null);
  const [success,setSuccess]=useState("");
  const [err,setErr]=useState("")
  const addPhoto=async()=>{


    const _id=user._id
    const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("_id",_id)
  if (src) {
    formdata.append("file", src);

  }
   
  await axios
  .post(`${API}/photo/upload`, formdata)
  .then((data) => {
    console.log(data)
    setSuccess("Added Photo")
    setErr("")
  })
  .catch((err) =>{
    console.log(err)
    setErr("Error in adding photo")
    setSuccess("")
  });


  }
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const Logout=(req,res)=>{
    
    signout().then((data)=>{

        navigate("/admin-login")

    }).catch(err=>{
        
    })

   }

  return (
    <div className="container-fluid p-4">
        {user['role']==0 && <>
      <div className="form-group d-flex justify-content-end container-fluid">
      <button className="btn btn-outline-dark m-2" onClick={e=>Logout()}>{"  "}Logout{"  "}</button>
        <button className="btn btn-outline-primary m-2">{"  "}View{"  "}</button>
      </div>
      {success && <div class="alert alert-success" role="alert">
{success}
</div>}
{err && <div class="alert alert-danger" role="alert">
{err}
</div>}
      <div className="d-flex align-items-center justify-content-center flex-column" style={{ marginTop: "100px" }}>
        <div className="w-lg-25">
          <div className="form-group mb-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder=""
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </div>
          {src && <img className="mb-5 border border-dark" src={src} alt="Selected" style={{ maxWidth: '300px', marginTop: '20px' }} />}
        {!src &&  <div className="form-group mb-4">
            <label htmlFor="photo" className="form-label">
              Photo
            </label>
            <input
              type="file"
              className="form-control"
              id="photo"
              placeholder=""
              onChange={handleFileChange}
            />
          </div>
}
          <div className="form-group">
            <button className="btn btn-primary w-100" onClick={e=>addPhoto()}>
              Submit
            </button>
          </div>
        </div>

       
      </div></>}
    </div>
  );
}
