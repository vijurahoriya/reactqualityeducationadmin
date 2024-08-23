import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, post } from "../helper/api";
import { toast } from "react-toastify";
const AddVideoCourse = () => {
  const [values, setValues] = useState({
    title: "",
    details: "",
    isActive: "",
    offerPrice: "",
    videoCategory: "",
    price: "",
    sequence: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoCat, setVideoCat] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchVideoCategory();
  }, []);

  //fetch video course category
  const fetchVideoCategory = async () => {
    try {
      const response = await get(`/api/videocoursecategory/allcourses`)
      console.log("aaaa", response);
      setVideoCat(response.data);
    } catch (error) {
      console.log("fetching video category error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("details", values.details);
      formData.append("isActive", values.isActive);
      formData.append("offerPrice", values.offerPrice);
      formData.append("price", values.price);
      formData.append("videoCategory", values.videoCategory);
      formData.append("sequence", values.sequence);
      if (imageFile) {
        formData.append("images", imageFile);
      }
      const response = await post(`/api/videocourse/add`, formData,)
      // console.log("111",response)
      toast.success(response.message)
      navigate("/videocourselist");
    } catch (error) {
      console.log("error in adding video course", error);
      toast.error(error.response.data.message)
    }
  };
  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fas fa-video me-2" />
                Add Video Course
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
                    Add Video Course
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards cstm-form">
              <form action="" onSubmit={handelFormSubmit}>
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
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
                      value={values.details}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Category
                    </label>
                    <select
                      name="videoCategory"
                      value={values.videoCategory}
                      onChange={handleChange}
                      id=""
                      className="form-select"
                    >
                      <option selected="">Select Category</option>

                      {videoCat.map((cat) => {
                        return (
                          <option key={cat._id} value={cat._id}>
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
                      value={values.isActive}
                      onChange={handleChange}
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
                      value={values.price}
                      onChange={handleChange}
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
                      Video Sequence
                    </label>
                    <input
                      type="text"
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
                      name="images"
                      // multiple
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <div className="image-box">
                      {imageFile && (
                        <div className="image-box-innr">
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Image"
                          />
                          <a href="javascript:void(0);">
                            <i className="far fa-times" />
                          </a>
                        </div>
                      )}
                      {/* <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="img" />
                        <a href="javascript:void(0);">
                          <i className="far fa-times" />
                        </a>
                      </div>
                      <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="img" />
                        <a href="javascript:void(0);">
                          <i className="far fa-times" />
                        </a>
                      </div>
                      <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="img" />
                        <a href="javascript:void(0);">
                          <i className="far fa-times" />
                        </a>
                      </div>
                      <div className="image-box-innr">
                        <img src="assets/images/avtar.jpg" alt="img" />
                        <a href="javascript:void(0);">
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

export default AddVideoCourse;
