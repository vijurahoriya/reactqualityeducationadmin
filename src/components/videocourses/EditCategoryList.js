import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../helper/baseurl";
import { get, post } from "../helper/api";
const EditCategoryList = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    category: "",
    categorySequence: "",
    isActive: "",
  });
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    fetchVideo();
  }, []);

  const navigate = useNavigate();

  const fetchVideo = async () => {
    try {
      const response = await get(`/api/videocoursecategory/details/${id}`)
      //   console.log("single", response.data);
      setValues(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", values.category);
      formData.append("categorySequence", values.categorySequence);
      formData.append("isActive", values.isActive);
      if (imageFile) {
        formData.append("categoryPhoto", imageFile);
      }
      const editResp = await post(`/api/videocoursecategory/edit/${id}`,formData)
      console.log("edited successfully");
      navigate("/categorylist");
    } catch (error) {
      console.log("category updating error", error);
    }
  };
  const handleOnChange = (e) => {
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
                Update Video Course Category
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
                    Update Video Course Category
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
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={values.category}
                      className="form-control"
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Category Sequence
                    </label>
                    <input
                      type="number"
                      name="categorySequence"
                      value={values.categorySequence}
                      onChange={handleOnChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      name="isActive"
                      value={values.isActive}
                      onChange={handleOnChange}
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
                      name="categoryPhoto"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      defaultValue=""
                    />
                    <div className="image-box">
                      <div className="image-box-innr">
                        <img
                          src={`${baseurl}/${values.categoryPhoto}`}
                          alt="preview"
                        />
                        <a href="#">
                          <i className="far fa-times" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-4 text-center">
                    <button className="thm-btn rounded-2" type="submit">
                      Update Video Course Category
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

export default EditCategoryList;
