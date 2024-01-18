import React, { useEffect, useState } from 'react';
import photo from "./person.svg";
import { useNavigate } from 'react-router-dom';
import { PAPI,API } from '../../backend';
import axios from 'axios';



export default function AdminTable() {

    const  navigate =useNavigate()
    const [userdata,setData]=useState([])
    const [flag,setFlag]=useState(0)
   
    const moveBack=()=>{
        navigate("/admin-dashboard")
    }

    const getUser=async()=>{

        try {
            await axios
              .get(`${API}/get-users`)
              .then((response) => {
               
               setData(response.data.data)
                
              })
              .catch((err) => {
               
               
              });
          } catch (err) {
            
          }
    
    
      }

      useEffect(()=>{
getUser()
      },[flag])

      const changeStatus= async (id)=>{

        try {
            await axios
              .post(`${API}/update-status`,{"userId":id})
              .then((response) => {
               setFlag(!flag)
               
                
              })
              .catch((err) => {
               
               console.log(err)
              });
          } catch (err) {
            
          }
    
    

      }

      const deleteUser= async (id)=>{

        try {
            await axios
              .post(`${API}/delete-user`,{"userId":id})
              .then((response) => {
               setFlag(!flag)
               
                
              })
              .catch((err) => {
               
               console.log(err)
              });
          } catch (err) {
            
          }
    
    

      }




  return (
    <div className='container-fluid p-4'>
      <div className="form-group d-flex justify-content-start container-fluid">
        <button className="btn btn-outline-primary" onClick={moveBack}>{"  <"}Back{"  "}</button>
      </div>

      <table className="table table-bordered mt-5 text-center">
        <thead>
          <tr>
            <th scope="col" style={{ backgroundColor: "#EAECFF" }}>User ID</th>
            <th scope="col" style={{ backgroundColor: "#EAECFF" }}>Name</th>
            <th scope="col" style={{ backgroundColor: "#EAECFF" }}>Photo</th>
            <th scope="col" style={{ backgroundColor: "#EAECFF" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          
            {userdata.map((data,index)=>{

                return <tr><td className="align-middle">{data.username}</td>
                <td className="align-middle">{data.name}</td>
                <td className="align-middle">{data.photo_status>=1?<img src={PAPI+'/uploads/'+data._id+'/'+data.filename} alt='photo' />:<img src={photo} alt='photo' />}</td>
                <td className="align-middle">
                 {data.photo_status!=2 && <button className="btn btn-primary  p-2 m-2" onClick={e=>changeStatus(data._id)}>{"  "}Done{"  "}</button>}
                  
                  <button className="btn btn-outline-primary p-2 m-2"  onClick={e=>deleteUser(data._id)}>{"  "}Delete{"  "}</button>
                </td>
              </tr>

            })}
            
          
        </tbody>
      </table>
    </div>
  );
}
