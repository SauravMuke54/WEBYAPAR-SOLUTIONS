import React, { useEffect, useRef, useState } from "react";
import { isAuthenticated, signout } from "../../helper";
import { API, PAPI } from "../../backend";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./utils";

export default function UserDashboard() {
  // const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const imgRef = useRef(null);
  const CROPPER_SIZE = { width: 200, height: 200 };
  const [cropmessage,setCropMessage]=useState()

  const navigate = useNavigate();
  const user = isAuthenticated().data.user;
  const [name, setName] = useState("");
  const [src, setSrc] = useState(null);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);

  const [frameErr, setFrameErr] = useState(null);

  const onCropComplete = (_, croppedArea) => {
    setCropMessage(null)
    setCroppedAreaPixels(croppedArea);
  };

  const handleCropChange = (newCrop) => {
    setCropMessage(null)
    setCrop(newCrop);
  };

  const handleZoomChange = (newZoom) => {
    setCropMessage(null)
    setZoom(newZoom);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSrc(file);
    console.log(file)

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleCropImage = async () => {

    const croppedImage = await getCroppedImg(image, croppedAreaPixels,src);
    // Handle the cropped image, for example, send it to the server or display it
    setSrc(croppedImage);
    
    setCropMessage("Crop Successfull !!")
  };

  const getUser = async () => {
    await axios
      .post(`${API}/get-user`, {
        _id: user._id,
      })
      .then((response) => {
        setData(response.data.data);
        setFrameErr(null);
      })
      .catch((err) => {
        setFrameErr("No Record Found");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const addPhoto = async () => {
    const _id = user._id;
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("_id", _id);
    if (image) {
      formdata.append("image", src);
    }

    await axios
      .post(`${API}/photo/upload`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
        setSuccess("Added Photo");
        setErr("");
      })
      .catch((err) => {
        console.log(err);
        setErr("Error in adding photo");
        setSuccess("");
      });
  };

  const Logout = (req, res) => {
    signout()
      .then((data) => {
        navigate("/admin-login");
      })
      .catch((err) => {});
  };

  return (
    <div className="container-fluid p-4">
      {user["role"] == 0 && (
        <>
          <div className="form-group d-flex justify-content-end container-fluid">
            <button
              className="btn btn-outline-dark m-2"
              onClick={(e) => Logout()}
            >
              {"  "}Logout{"  "}
            </button>
            <button
              className="btn btn-outline-primary m-2"
              data-bs-toggle="modal"
              data-bs-target="#cornerSlideInModal"
            >
              {"  "}View{"  "}
            </button>
          </div>
          {success && (
            <div class="alert alert-success" role="alert">
              {success}
            </div>
          )}
          {err && (
            <div class="alert alert-danger" role="alert">
              {err}
            </div>
          )}
          <div
            className="d-flex align-items-center justify-content-center flex-column"
            style={{ marginTop: "100px" }}
          >
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
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              {image && (
                <div
                  style={{
                    width: "300px",
                    height: "200px",
                    position: "relative",
                  }}
                >
                  <Cropper
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1} // Set your desired aspect ratio
                    onCropChange={handleCropChange}
                    onZoomChange={handleZoomChange}
                    onCropComplete={onCropComplete}
                    cropSize={CROPPER_SIZE}
                    maxWidth={CROPPER_SIZE.width}
                    maxHeight={CROPPER_SIZE.height}
                    ref={imgRef}
                  />
                  <button
                    className="btn btn-primary"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      zIndex: 2,
                    }}
                    onClick={handleCropImage}
                  >
                    Crop Image
                  </button>
                </div>
              )}

              <center className="p-2 mt-3 mb-3">
                {cropmessage && (
                  <span className="text text-success p-2 mt-5 mb-5">{cropmessage}</span>
                )}
              </center>

              {!src && (
                <div className="form-group mb-4">
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
              )}
              <div className="form-group">
                <button
                  className="btn btn-primary w-100"
                  onClick={(e) => addPhoto()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div
        class="modal fade"
        id="cornerSlideInModal"
        tabindex="-1"
        aria-labelledby="cornerSlideInModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-corner-slide-in">
          <div class="modal-content">
           
            <div class="modal-body">
              <div className="form-group d-flex justify-content-end container-fluid">
                <button
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  {"  "}Back{"  "}
                </button>
              </div>

              {frameErr && (
                <div class="alert alert-danger" role="alert">
                  {frameErr}
                </div>
              )}
              {data && (
                <>
                  <div className="form-group mb-4 mt-5">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder=""
                      value={data.name}
                      readOnly
                    />
                  </div>
                  <label htmlFor="name" className="form-label">
                    Photo
                  </label>
                  <div className="d-flex align-item-center justify-content-center">
                    {" "}
                    {data.photo_status >= 1 ? (
                      <img
                        src={PAPI + "/uploads/" + data.filename}
                        className="img-fluid"
                        maxWidth={"500px"}
                        maxHeight={"500px"}
                      />
                    ) : (
                      <>No photo to display</>
                    )}
                  </div>
                </>
              )}

              {data && (
                <div className="p-2 mt-2 d-flex justify-content-center align-item-center mb-5">
                  {data.photo_status === 1 && (
                    <span
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "30px",
                        color: "#F54949",
                        textAlign: "center",
                      }}
                    >
                      Not Accepted by Admin
                    </span>
                  )}
                  {data.photo_status === 2 && (
                    <span
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "30px",
                        color: "#249E45",
                        textAlign: "center",
                      }}
                    >
                      Accepted by Admin
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
