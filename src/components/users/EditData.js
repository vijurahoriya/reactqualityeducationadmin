import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseurl, header } from "../helper/baseurl";
import axios from "axios";
// import avtar from "../../assets/images/avtar.jpg";
import { toast } from "react-toastify";
import { get, post } from "../helper/api";

const EditData = () => {
  const { id } = useParams();
  // console.log("id",id)
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    pin: "",
    status: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  // console.log("values",imageFile)
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const fetchData = async () => {
    // const resp = await axios(`${baseurl}/api/user/user_data/${id}`, {
    //   method: "GET",
    //   headers:header.headers
    // });
    const resp = await get(`/api/user/user_data/${id}`)
    // console.log("resp", resp);
    // setValues(resp.data)
    const userData = resp.data;
    const formatedDate = formatDate(userData.dob);
    // console.log("formatdata",formatedDate)
    setValues({
      ...userData,
      dob: formatedDate,
    });
    // console.log("1222", { ...userData, dob: formatedDate });
  };
 
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    console.log("month", month);

    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //handle input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    //  console.log("firstpp",{...values,[name]:value})
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   // console.log("file",file);
  //   setImageFile(file)
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("profileImg", imageFile);
      }
      formData.append("firstName",values.firstName);
      formData.append("lastName",values.lastName);
      formData.append("dob",values.dob);
      formData.append("email",values.email);
      formData.append("phone",values.phone);
      formData.append("gender",values.gender);
      formData.append("city",values.city);
      formData.append("pin",values.pin); 
      formData.append("status",values.status)
    
      // const editresponse = await axios.post(
      //   `${baseurl}/api/user/edit/${id}`,
      //   formData,
      //   {
      //     headers:header.headers
      //   }
      // );
      const editresponse = await post(`/api/user/edit/${id}`,formData)
      // console.log("formData",formData)
      // console.log("editresp", editresponse.data.message);
      toast.success(editresponse.message)
      navigate("/userlist");
    } catch (error) {
      console.log("updaing user error", error);
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
                Update User
              </h4>
            </div>
            <div className="custom-bredcump">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Update user
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards cstm-form">
              <form action="multipart/form-data" onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      DOB
                    </label>
                    <input
                      type="date"
                      name="dob"
                      className="form-control"
                      value={values.dob}
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
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      value={values.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
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
                      name="city"
                      className="form-control"
                      value={values.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      PIN
                    </label>
                    <input
                      type="number"
                      name="pin"
                      className="form-control"
                      value={values.pin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="frm-bx mb-4 col-lg-4 mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      name="status"
                      value={values.status}
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
                      name="profileImg"
                      className="form-control"
                      onChange={(event) => setImageFile(event.target.files[0])}
                    />
                    <div className="image-box">
                      <div className="image-box-innr">
                        <img src={`${baseurl}/${values.profileImg}`} alt="preview" />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="frm-bx mb-4 col-lg-12 mb-3 text-center">
                    <button className="thm-btn rounded-2" type="submit">
                      Update User
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

export default EditData;
