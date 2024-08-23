import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get, post } from "../helper/api";
const EditLiveVideoCourseCategory = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    category: "",
    categorySequence: "",
    isActive: "",
  });
  const [imageFile,setImageFile] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    fatchLiveCatSingleData();
  }, []);

  const fatchLiveCatSingleData = async () => {
    try {
      const resp = await get(`/api/livevideocoursescategory/details/${id}`)
      // console.log("resp",resp.data)
      setValues(resp.data);
    } catch (error) {
      console.log("error single data fetching", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEditLiveCat = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("category", values.category);
        formData.append("categorySequence", values.categorySequence);
        formData.append("isActive", values.isActive);
        if (imageFile) {
          formData.append("categoryPhoto", imageFile);
        }
      const editResponse = await post(`/api/liveVideoCoursesCategory/edit/${id}`,formData)
      // console.log("112222", editResponse);
      navigate("/livevideocoursecategorylist");
    } catch (error) {
      console.log("live cat editing error", error);
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
                Update Live Video Course Category
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
                    Update Live Video Course Category
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards cstm-form">
              <form action="multipart/form-data" onSubmit={handleEditLiveCat}>
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="category"
                      onChange={handleChange}
                      value={values.category}
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
                      onChange={handleChange}
                      value={values.categorySequence}
                      className="form-control"
                    />
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
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      defaultValue=""
                      name="categoryPhoto"
                      onChange={(e)=>setImageFile(e.target.files[0])}
                    />
                  </div>
                  <div className="col-lg-12 mb-4 text-center">
                    <button className="thm-btn rounded-2" type="submit">
                      Update Live Video Course Category
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

export default EditLiveVideoCourseCategory;
