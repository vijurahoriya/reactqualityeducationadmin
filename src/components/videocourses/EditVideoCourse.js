import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseurl} from "../helper/baseurl";
import { get, post } from "../helper/api";

const EditVideoCourse = () => {
  const { id } = useParams();
  // console.log("object",id)

  const [values, setValues] = useState({
    title: "",
    videoCategory: "",
    isActive: "",
    price: "",
    offerPrice: "",
  });
  const [catList, setCatList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  // fetch category list
  const fetchCategory = async () => {
    const catResp = await get(`/api/videocoursecategory/allcourses`)
    // console.log("catresp",catResp.data.data)
    setCatList(catResp.data);
  };

  //fetch all data
  const fetchData = async () => {
    const response = await get(`/api/videocourse/videoCoursDetails/${id}`)
    // console.log("responseall", response);
    setValues(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preVal) => ({ ...preVal, [name]: value }));
    // setValues({...values,[name]:value});
    // console.log("object", { ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
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
      const response = await post(`/api/videocourse/edit/${id}`,formData)
      // console.log("success", response);
      navigate("/videocourselist");
    } catch (error) {
      console.log("updating video error", error);
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
                Edit Video Course
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
                    Edit Video Course
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards cstm-form">
              <form action="multipart/form-data" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      defaultValue=""
                      value={values.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label htmlFor="" className="form-label">
                      Video Category
                    </label>
                    <select
                      name="videoCategory"
                      id=""
                      onChange={handleChange}
                      value={values.videoCategory}
                      className="form-select"
                    >
                      <option selected="">Select Category</option>

                      {catList.map((cat) => {
                        // console.log(cat._id,"123123")
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
                      onChange={handleChange}
                      id=""
                      value={values.isActive}
                      className="form-select"
                    >
                      <option selected="">Select Status</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
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
                      multiple
                      onChange={(event) => setImageFile(event.target.files[0])}
                    />
                    <div className="image-box">
                      {
                        values.images?.map((img) => {
                          return (
                            <div className="image-box-innr">
                              <img src={`${baseurl}/${img.image}`} alt="preview" />
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
                      Save Video Course
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

export default EditVideoCourse;
