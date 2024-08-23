import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseurl} from "../helper/baseurl";
import { get, post } from "../helper/api";

const EditLiveVideoCourse = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    title: "",
    videoCategory: "",
    isActive: "",
    price: "",
    offerPrice: "",
  });
  const [liveCatList, setLiveCatList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  //  console.log("values",values)
  useEffect(() => {
    fatchSingleData();
    fetchCategory();
  }, []);

  // fetch category list api
  const fetchCategory = async () => {
    try {
      const catResponse = await get(`/api/livevideocoursescategory/allcourses`)
      //   console.log("catResponse", catResponse.data.data);
      setLiveCatList(catResponse.data);
    } catch (error) {
      console.log("error category fetching", error);
    }
  };

  //fetch single api
  const fatchSingleData = async () => {
    const response = await get(`/api/livevideocourse/videoCoursDetails/${id}`)
    console.log("singleresponse", response.data);
    setValues(response.data);
  };

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("videoCategory", values.videoCategory);
      formData.append("isActive", values.isActive);
      formData.append("price", values.price);
      formData.append("offerPrice", values.offerPrice);
      if (imageFile) {
        formData.append("photos", imageFile);
      }
      const resp = await post(`/api/livevideocourse/edit/${id}`,formData)
      //   console.log("catresp", resp);
      navigate("/livevideocourselist");
    } catch (error) {
      console.log("error in category update", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // setValues((preVal) => ({ ...preVal, [name]: value }));
  };
  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fas fa-video me-2" />
                Update Live Video Course
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
                    Update Live Video Course
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards cstm-form">
              <form
                action="multipart/form-data"
                onSubmit={handleCategoryUpdate}
              >
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Category
                    </label>
                    <select
                      name="videoCategory"
                      id=""
                      value={values.videoCategory}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option selected="">Select Category</option>
                      {liveCatList.map((cat) => {
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
                      id=""
                      value={values.isActive}
                      onChange={handleChange}
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
                      value={values.offerPrice}
                      onChange={handleChange}
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
                      defaultValue=""
                      name="photos"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <div className="image-box">
                      {values.images?.map((img) => {
                        return (
                          <div className="image-box-innr">
                            <img src={`${baseurl}/${img.image}`} alt="img" />
                            <a href="#">
                              <i className="far fa-times" />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-12 mb-4 text-center">
                    <button className="thm-btn" type="submit">
                      Update Video Course
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

export default EditLiveVideoCourse;
