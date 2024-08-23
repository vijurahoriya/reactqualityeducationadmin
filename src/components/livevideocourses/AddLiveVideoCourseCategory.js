import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { post } from "../helper/api";
const AddLiveVideoCourseCategory = () => {
  const [liveCatFormData, setLivecatformData] = useState({
    category: "",
    categorySequence: "",
    isActive: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivecatformData({ ...liveCatFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", liveCatFormData.category);
      formData.append("categorySequence", liveCatFormData.categorySequence);
      formData.append("isActive", liveCatFormData.isActive);
      if (imageFile) {
        formData.append("categoryPhoto", imageFile);
      }
      const response = await post(`/api/liveVideoCoursesCategory/add`,formData)
      console.log("response", response);
      navigate("/livevideocoursecategorylist");
      toast.success(response.message);
    } catch (error) {
      console.log("live category adding error", error);
      toast.error (error.response.data.message)
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
                Add Live Video Course Category
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
                    Add Live Video Course Category
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
                      Course Category Name
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={liveCatFormData.category}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Category Sequence
                    </label>
                    <input
                      type="number"
                      name="categorySequence"
                      value={liveCatFormData.categorySequence}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      name="isActive"
                      value={liveCatFormData.isActive}
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
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      //   defaultValue=""
                      name="categoryPhoto"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                  <div className="image-box">
                    {imageFile && (
                      <div className="image-box-innr">
                        <img src={URL.createObjectURL(imageFile)} alt="img" />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 mb-4 text-center">
                    <button className="thm-btn rounded-2" type="submit">
                      Add Live Video Course Category
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

export default AddLiveVideoCourseCategory;
