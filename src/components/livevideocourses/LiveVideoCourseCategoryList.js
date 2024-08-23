import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseurl, header } from "../helper/baseurl";
import { get, post, put } from "../helper/api";
import axios from "axios";
import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";
import Pagination from "../helper/Pagination";
import { toast } from "react-toastify";

const LiveVideoCourseCategoryList = () => {
  const [liveVideoCatData, setLiveVideoCatData] = useState([]);
  const [liveVideoCatStatus, setLiveVideoCatStatus] = useState([]);
  const [liveCatCount,setLiveCatCount] = useState([])
  const [page, setPage] = useState(1);
  const [LiveCatSearch, setLiveCatSearch] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const itemPerPage = 10;

  // console.log("catSequence",catSequence)

  useEffect(() => {
    if (isSearching) {
      handleLiveCatSearch();
    } else {
      fetchLiveCatData();
    }
  }, [page,isSearching]);

  //pagination
  const handlePageChange = (pageNumber) => {
    // console.log("pageNumbeer",pageNumber)
    setPage(pageNumber);
  };

  const fetchLiveCatData = async () => {
    const response = await get(`/api/livevideocoursescategory/allcourses?p=${page}`)
    // console.log("lcatresponse", response.data);
    setLiveVideoCatData(response.data.allCategoryData);
    setLiveCatCount(response.data.CategoryCount)
    const initialStatus = response.data.allCategoryData.map((livecat) => ({
      id: livecat._id,
      status: livecat.isActive,
    }));
    // console.log("livecat",initialStatus)
    setLiveVideoCatStatus(initialStatus);
  };

  const handleStatusChange = async (id) => {
    try {
      const statusResponse = await put(`/api/livevideocoursescategory/active/${id}`)
      // console.log("statusresponse", statusResponse.data);
      const updatedStatus = liveVideoCatStatus.map((liveCat) =>
        liveCat.id === id
          ? { ...liveCat, status: statusResponse.data.isActive }
          : liveCat
      );
      setLiveVideoCatStatus(updatedStatus);
    } catch (error) {
      console.log("live cat status change error", error);
    }
  };
  const handleInputChange = (id,val) => {
    setLiveVideoCatData((prevData)=>
         prevData.map((cat)=>
           cat._id === id ? {...cat,categorySequence:val}:cat
         )
    )
  };

  // sequence change api
  const handleSequenceChange = async (id) => {
    const updateCatSequence = liveVideoCatData.find((cat)=>cat._id === id)
    console.log("updatedcatseq",updateCatSequence.categorySequence)
    try {
      const sequenceResp = await axios.put(
        `${baseurl}/api/livevideocoursescategory/update_sequence/${id}?p=${page}`,
        { categorySequence: updateCatSequence.categorySequence},
        {
          headers:header.headers
        }
      );
     console.log("sequenceresp",sequenceResp)

      //  setLiveVideoCatData(sequenceResp.data.data);
      fetchLiveCatData();
    } catch (error) {
      console.log("live cat sequence changing error", error);
    }
  };

  //delete api
  const handleLiveCatDelete = async (id) => {
    try {
      const delResponse = await post(`/api/liveVideoCoursesCategory/delete/${id}`)
      // console.log("deleteresponse",delResponse)
      setLiveVideoCatData(
        liveVideoCatData.filter((livecat) => livecat._id !== id)
      );
      fetchLiveCatData();
      toast.success(delResponse.data.message);
    } catch (error) {
      console.log("live video cat delete error", error);
      toast.error("live category deleting error");
    }
  };

  // search live cat api
  const handleLiveCatSearch = async () => {
    try {
      const searchResponse = await get(`/api/livevideocoursescategory/search?category=${LiveCatSearch}`)
      console.log("serach",searchResponse.data)
      // if (searchResponse.data === Array) {
      //   toast.warning("No Search Results found")
      // } else {
        setLiveVideoCatData(searchResponse.data)
      // }
      
    } catch (error) {
      console.log("error in live category search", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setPage(1);
  };
  const handleResetSearch = () => {
    setLiveCatSearch("");
    setIsSearching(false);
  };

  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fas fa-video me-2" />
                Live Video Course Category List
              </h4>
              <Link to="/addlivevideocoursecategory" className="blu-btn">
                <i className="far fa-plus me-2" />
                Add Live Video Course Category
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
                    Live Video Course Category List
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
                      Total Live Video Course Category ({liveCatCount})
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
                            value={LiveCatSearch}
                            onChange={(e) => setLiveCatSearch(e.target.value)}
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
                    {liveVideoCatData.map((curElem, index) => {
                      return (
                        <tr key={curElem._id}>
                          <th>{++index + 10 * (page - 1)}</th>
                          <th>
                            <img
                              src={`${baseurl}/${curElem.categoryPhoto}`}
                              className="img-40"
                              alt=""
                            />
                          </th>
                          <td>{curElem.category}</td>
                          <td>
                            <div className="d-flex table-box">
                              <input
                                type="number"
                                className="form-control"
                                name="categorySequence"
                                value={curElem.categorySequence}
                                // value={sequenceMap[curElem._id] || curElem.categorySequence}
                                onChange={(e) => handleInputChange(curElem._id,e.target.value)}
                                //  onChange={(e)=>setSequenceMap(e.target.value)}
                             />
                              <button
                                onClick={() =>
                                  handleSequenceChange(curElem._id)
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
                                onChange={() => handleStatusChange(curElem._id)}
                                type="checkbox"
                                // defaultChecked=""
                                checked={
                                  liveVideoCatStatus.find(
                                    (video) => video.id === curElem._id
                                  )?.status
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <Link
                              to={`/editlivevideocoursecategory/${curElem._id}`}
                              className="mx-2"
                            >
                              <img src={edit} alt="edit" />
                            </Link>
                            <button
                              onClick={() => handleLiveCatDelete(curElem._id)}
                              className="mx-2"
                            >
                              <img src={trash} alt="trash" />
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
                  totalItems={liveCatCount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LiveVideoCourseCategoryList;
