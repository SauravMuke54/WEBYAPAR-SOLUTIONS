import React, { useEffect, useState } from "react";
import photo from "./person.svg";
import { useNavigate } from "react-router-dom";
import { PAPI, API } from "../../backend";
import axios from "axios";

export default function AdminTable() {
  const navigate = useNavigate();
  const [userdata, setData] = useState([]);
  const [flag, setFlag] = useState(0);

  const moveBack = () => {
    navigate("/admin-dashboard");
  };

  const getUser = async () => {
    try {
      await axios
        .get(`${API}/get-users`)
        .then((response) => {
          setData(response.data.data);

          console.log(userdata);
        })
        .catch((err) => {});
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, [flag]);

  const changeStatus = async (id) => {
    try {
      await axios
        .post(`${API}/update-status`, { userId: id })
        .then((response) => {
          setFlag(!flag);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  const deleteUser = async (id) => {
    try {
      await axios
        .post(`${API}/delete-user`, { userId: id })
        .then((response) => {
          setFlag(!flag);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  return (
    <div className="container-fluid p-4">
      <div className="form-group d-flex justify-content-start container-fluid">
        <button className="btn btn-outline-primary" onClick={moveBack}>
          {"  <"}Back{"  "}
        </button>
      </div>

      <table className="table table-bordered mt-5 text-center">
        <thead>
          <tr className="d-none d-lg-table-row d-md-table-row">
            <th
              className="col-lg-3 col-md-3 "
              style={{ backgroundColor: "#EAECFF" }}
            >
              User ID
            </th>
            <th
              className="col-lg-3 col-md-3 "
              style={{ backgroundColor: "#EAECFF" }}
            >
              Name
            </th>
            <th
              className="col-lg-3 col-md-3 "
              style={{ backgroundColor: "#EAECFF" }}
            >
              Photo
            </th>
            <th
              className="col-lg-3 col-md-3 "
              style={{ backgroundColor: "#EAECFF" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((data, index) => (
            <>
              {/* //only to show in large and medium screen */}
              <tr key={index} className="d-none d-lg-table-row d-lg-table-row d-md-table-row">
                <td className="align-middle col-lg-3 col-md-3 ">
                  {data.username}
                </td>
                <td className="align-middle col-lg-3 col-md-3 ">
                  {data.name}
                </td>
                <td className="align-middle col-lg-3 col-md-3 ">
                  {data.photo_status >= 1 ? (
                    <img
                      className="img-fluid "
                      src={PAPI + "/uploads/" + data.filename}
                      width={"120px"}
                      height={"120px"}
                      maxWidth={"120px"}
                      maxHeight={"120px"}
                      alt="user"
                    />
                  ) : (
                    <img
                      src={photo}
                      alt="photo"
                      width={"120px"}
                      height={"120px"}
                    />
                  )}
                </td>
                <td className="align-middle col-lg-3 col-md-3 ">
                  {data.photo_status !== 2 && (
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => changeStatus(data._id)}
                    >
                      Done
                    </button>
                  )}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => deleteUser(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {/* //only to show in small screen */}
              <tr className="row border-0 d-lg-none d-md-none d-sm-table-row">
                <td colSpan="3" rowSpan={"2"} className="border-0 ">
                  <div
                    className="row border border-dark align-items-center"
                    style={{
                      backgroundColor: "#EAECFF",
                      width: "100%",
                      height: "60px",
                    }}
                  >
                    <div
                      className="col-5 text-end"
                      style={{
                        fontSize: "14px",
                        fontWeight: 300,
                        fontFamily: "Monserrat",
                      }}
                    >
                      <b> {"User ID : " + data.username}</b>
                    </div>

                    <div className="col-2 text-center">
                      <b> {"|"}</b>
                    </div>

                    <div
                      className="col-5 text-start"
                      style={{
                        fontSize: "14px",
                        fontWeight: 300,
                        fontFamily: "Monserrat",
                      }}
                    >
                      <b> {"Name : " + data.name}</b>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 text-start">
                      <b>
                        {" "}
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 300,
                            fontFamily: "Monserrat",
                          }}
                        >
                          {" "}
                          Photo:
                        </span>
                      </b>
                      {data.photo_status >= 1 ? (
                        <img
                          className="img-fluid m-2"
                          src={PAPI + "/uploads/" + data.filename}
                          width={"56px"}
                          height={"56px"}
                          maxWidth={"120px"}
                          maxHeight={"120px"}
                          alt="user"
                        />
                      ) : (
                        <img
                          className="img-fluid m-2"
                          src={photo}
                          alt="photo"
                          width={"56px"}
                          height={"56px"}
                        />
                      )}
                    </div>
                    <div className="col-6 text-center">
                      <b>
                        {" "}
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 300,
                            fontFamily: "Monserrat",
                          }}
                        >
                          {" "}
                          Action
                        </span>
                      </b>
                      <br/>

                      {data.photo_status !== 2 && (
                        <button
                          className="btn btn-primary m-2 p-2"
                          onClick={() => changeStatus(data._id)}
                        >
                          Done
                        </button>
                      )}
                      <button
                        className="btn btn-outline-primary p-2 m-2"
                        onClick={() => deleteUser(data._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
