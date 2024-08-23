import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { baseurl, header } from "../helper/baseurl";
import { post } from "../helper/api";
const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    pin: '',
    status: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", formData.firstName);
      formData.append("lastName", formData.lastName);
      formData.append("dob", formData.dob);
      formData.append("email", formData.email);
      formData.append("phone", formData.phone);
      formData.append("gender", formData.gender);
      formData.append("city", formData.city);
      formData.append("pin", formData.pin);
      formData.append("status", formData.status);
      formData.append("profileImg",imageFile);
      const response = await post(`/api/user/register`,formData)
      console.log("Addresponse", response);
    } catch (error) {
      console.log("Error Adding user", error);
    }
  };
  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fas fa-users me-2" />
                Add User
              </h4>
            </div>
            <div className="custom-bredcump">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add user
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards cstm-form">
              <form action="" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      DOB
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder=""
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Gender
                    </label>
                    <select
                      name="gender"
                      onChange={handleChange}
                      value={formData.gender}
                      id=""
                      className="form-select"
                    >
                      <option selected="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      PIN
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter PIN"
                      name="pin"
                      value={formData.pin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      id=""
                      className="form-select"
                    >
                      <option selected="">Select Status</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={handleImgChange}
                      className="form-control"
                    />  
                    <div className="image-box">
                      <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="" />
                        <a href="javascript:void(0);">
                          <i className="far fa-times" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="frm-bx mb-4 col-lg-12 mb-3 text-center">
                    <button className="thm-btn rounded-2" type="submit">
                      Add User
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddUser;
