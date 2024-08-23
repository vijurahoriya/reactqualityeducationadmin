import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { get, post } from "../helper/api";

const AddLiveVideoCourse = () => {
  const [values, setValues] = useState({
    title: "",
    details: "",
    price: "",
    offerPrice: "",
    livevideoCategory: "",
    sequence: "",
    isActive: "",
  });
  const [liveVideoCat, setLiveVideoCat] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchLiveCategory();
  }, []);

  // fetch single cat api
  const fetchLiveCategory = async () => { 
    try {
      const resp = await get(`/api/livevideocoursescategory/allcourses`) 
      // console.log("catresp",resp)
      setLiveVideoCat(resp.data);
    } catch (error) {
      console.log("live cat fetching error", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("details", values.details);
      formData.append("price", values.price);
      formData.append("offerPrice", values.offerPrice);
      formData.append("livevideoCategory", values.livevideoCategory);
      formData.append("sequence", values.sequence);
      formData.append("isActive", values.isActive);
      if (imageFile) {
        formData.append("images", imageFile);
      }
      const response = await post(`/api/livevideocourse/add`, formData,)
      console.log("resppo", response);
      navigate('/livevideocourselist')
      toast.success(response.message)
    } catch (error) {
      console.log("live VideoCourse Adding error", error);
      toast.error(error.response.data.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  
  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fas fa-video me-2" />
                Add Live Video Course
              </h4>
            </div>
            <div className="custom-bredcump">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Video Course Management</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Live Video Course
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards cstm-form">
              <form action="" onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      // defaultValue=""
                      value={values.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Details
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="details"
                      // defaultValue=""
                      value={values.details}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Category
                    </label>
                    <select
                      name="livevideoCategory"
                      onChange={handleChange}
                      id=""
                      className="form-select"
                    >
                      <option selected="">Select Category</option>

                      {liveVideoCat.map((cat) => {
                        return (
                          <option key={cat._is} value={cat._id}>
                            {cat.category}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      name="isActive"
                      onChange={handleChange}
                      value={values.isActive}
                      id=""
                      className="form-select"
                    >
                      <option selected="">Select Status</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      onChange={handleChange}
                      value={values.price}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Offer Price
                    </label>
                    <input
                      type="text"
                      name="offerPrice"
                      onChange={handleChange}
                      value={values.offerPrice}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Sequence
                    </label>
                    <input
                      type="number"
                      name="sequence"
                      onChange={handleChange}
                      value={values.sequence}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      // defaultValue=""
                      name="images"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <div className="image-box">
                    {
                      imageFile && (
                        <div className="image-box-innr">
                        <img src={URL.createObjectURL(imageFile)} alt="img" />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div>
                      )
                    }
                      {/* <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="" />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div>
                      <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="" />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div>
                      <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="" />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div>
                      <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="" />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-12 mb-4 text-center">
                    <button className="thm-btn" type="submit">
                      Add Video Course
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

export default AddLiveVideoCourse;
