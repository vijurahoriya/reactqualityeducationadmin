import React, { useEffect, useState } from "react";
import { baseurl, header } from "../helper/baseurl";
import axios from "axios";
import { Link } from "react-router-dom";
import trash from "../../assets/images/trash.png";
import edit from "../../assets/images/edit.png";
import { toast } from "react-toastify";
import Pagination from "../helper/Pagination";
import { get, post, put } from "../helper/api";

const CategoryList = () => {
  const [catData, setCatData] = useState([]);
  const [catStatus, setCatStatus] = useState([]);
  const [sequenceValues, setSequenceValues] = useState({});
  const [searchCat, setSearchCat] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [catCount, setCatCount] = useState(1);
  const itemPerPage = 10;

// console.log("catDat",catData)
  useEffect(() => {
    if (isSearching) {
      handleSearchSubmit();
    } else {
      fetchcatData();
    }
  }, [page, isSearching]);

  // fetch category data
  const fetchcatData = async () => {
    try {
      const catresponse = await get(
        `/api/videocoursecategory/allcourses?p=${page}`
      );
      // console.log("catresponse", catresponse.data);
      setCatData(catresponse?.data?.allCategoryData);
      setCatCount(catresponse?.data?.CategoryCount);
     ; const initialStatus = catresponse?.data?.allCategoryData?.map((cat) => ({
        id: cat._id,
        status: cat.isActive,
      }))
      setCatStatus(initialStatus);
     
    } catch (error) {
      console.log("cat fetching error", error);
    }
  };

  //paginations
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // status change api
  const handlechangeStatus = async (id) => {
    const statusresp = await put(`/api/videocoursecategory/active/${id}`);
    // console.log(statusresp,"aa")
    const updatedStatus = catData.map((cat) =>
      cat.id === id ? { ...cat, status: statusresp.data.isActive } : cat
    );
    setCatStatus(updatedStatus);
    fetchcatData();
  };

  // update category sequence api
  const handleUpdateSequence = async (id) => {
    try {
      // console.log("Updating sequence for category ID:", id);
      console.log("Sending sequence values:", sequenceValues);
      const sequenceResponse = await axios.put(
        `${baseurl}/api/videocoursecategory/update_sequence/${id}`,
        {
          categorySequence: sequenceValues,
        },
        { headers: header.headers }
      );
      console.log("sequenceResponse",sequenceResponse);

      // console.log("sequenceResponse", sequenceResponse.data.data);
      //   const response1 = sequenceResponse.data.data.map((aa)=>
      //        aa._id === id ? {...aa,categorySequence:sequenceValues}:aa

      // )

      setCatData(sequenceResponse.data.data);
      await fetchcatData();
    } catch (error) {
      console.log("updating sequence error", error);
    }
  };
  // console.log("aaaa", sequenceValues);
  const handleSequenceChange = (val) => {
    console.log("val", val);
    setSequenceValues(val);

  };

  //delete api
  const handleCategoryDelete = async (id) => {
    try {
      const response = await post(`/api/videocoursecategory/delete/${id}`);
      setCatData(catData.filter((cat) => cat._id !== id));
      toast.success(response.message);
    } catch (error) {
      console.log("deleting category error", error);
    }
  };

  // search api  in category
  const handleSearchSubmit = async () => {
    const searchResponse = await get(
      `/api/videocoursecategory/search?category=${searchCat}`
    );
    // console.log("searchResponse",searchResponse.data)
    setCatData(searchResponse.data);
  };

  const handleResetSearch = () => {
    setSearchCat("");
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setPage(1);
  };

  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fas fa-video me-2" />
                Video Course Category List
              </h4>
              <Link to="/addcoursecategory" className="blu-btn">
                <i className="far fa-plus me-2" />
                Add Course Category
              </Link>
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
                    Video Course Category List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="cards bus-list">
              <div className="bus-filter">
                <div className="row justify-content-end">
                  <div className="col-lg-7">
                    <h4 className="table-head">
                      Total Video Course Category ({catCount})
                    </h4>
                  </div>
                  <div className="col-lg-5 w-100">
                    <form action="">
                      <div className="row justify-content-end gx-2 align-items-center">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchCat}
                            onChange={(e) => setSearchCat(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-2">
                          <button
                            type="button"
                            onClick={handleSearch}
                            className="blu-btn w-100"
                          >
                            Search
                          </button>
                        </div>
                        <div className="col-lg-2">
                          <button
                            type="button"
                            onClick={handleResetSearch}
                            className="blu-btn w-100"
                          >
                            Reset Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="table table-responsive custom-table">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>SR NO.</th>
                      <th>Image</th>
                      <th>Category NAME</th>
                      <th>CATEGORY SEQUENCE</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catData &&
                      catData.map((curElem, index) => {
                        return (
                          <tr key={curElem._id}>
                            <th>{++index + 10 * (page - 1)}</th>
                            <th>
                              <img
                                src={baseurl + "/" + curElem.categoryPhoto}
                                className="img-40"
                                alt="img"
                              />
                            </th>
                            <td>{curElem.category}</td>
                            <td>
                              <div className="d-flex table-box">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={sequenceValues[curElem._id]}
                                  defaultValue={curElem.categorySequence}
                                  name="categorySequence"
                                  onChange={(e) =>handleSequenceChange(e.target.value)}
                                />
                                <button
                                  onClick={() =>
                                    handleUpdateSequence(curElem._id)
                                  }
                                  className="btn btn-success ms-2"
                                >
                                  Update
                                </button>
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  // defaultChecked=""
                                  onChange={() =>
                                    handlechangeStatus(curElem._id)
                                  }
                                  checked={
                                    catStatus.find(
                                      (cat) => cat.id === curElem._id
                                    )?.status
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <Link
                                to={`/editcategorylist/${curElem._id}`}
                                className="mx-2"
                              >
                                <img src={edit} alt="" />
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCategoryDelete(curElem._id)
                                }
                                className="mx-2"
                              >
                                <img src={trash} alt="" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <Pagination
                  currentPage={page}
                  onPageChange={handlePageChange}
                  itemPerPage={itemPerPage}
                  totalItems={catCount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;
