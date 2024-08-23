import React, { useEffect, useState } from "react";
import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";
import { baseurl } from "../helper/baseurl";
import Pagination from "../helper/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { get, post, put } from "../helper/api";

const VideoCourseList = () => {
  const [videoData, setVideoData] = useState([]);
  const [videoStatus, setVideoStatus] = useState([]);
  const [page, setPage] = useState(1);
  const [videoCount, setVideoCount] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const itemPerPage = 10;

  useEffect(() => {
    if (isSearching) {
      handleSearch();
    } else {
      videoCourseData();
    }
  }, [page, isSearching]);

  //fetch video Data
  const videoCourseData = async () => {
    const response = await get(`/api/videocourse/allcourses?p=${page}`)
    // console.log("response video", response?.data?.allvideoCourseData);
    setVideoData(response?.data?.allvideoCourseData);
    setVideoCount(response?.data?.userCount);
    const initialStatus = response?.data?.allvideoCourseData.map(
      (video) => ({
        id: video._id,
        status: video.isActive,
      })
    );
    // console.log("inistatus",initialStatus)
    setVideoStatus(initialStatus);
  };

  //video status
  const handleVideoStatus = async (id) => {
    const statusResponse = await put(`/api/videocourse/activevideo/${id}`)
    // console.log("statusres",statusResponse?.data?.data)
    const updatedVideoStatus = videoStatus.map((video) =>
      video.id === id
        ? { ...video, status: statusResponse?.data?.isActive }
        : video
    );
    // console.log("upstatus",updatedVideoStatus)
    setVideoStatus(updatedVideoStatus);
    toast.success(statusResponse?.message);
  };

  //pagination
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setSearchTitle("");
    setSearchCategory("");
    setIsSearching(false);
  };

  // delete video api

  const handleVideoDelete = async (id) => {
    try {
      const res = await post(`/api/videocourse/deletecourse/${id}`)
      setVideoData(videoData.filter((video) => video._id !== id));
      toast.success(res.message);
    } catch (error) {
      console.log("video deleting error", error);
      toast.error("video deleting error");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setPage(1);
    //  console.log(searchCategory,searchTitle)
  };
  const handleResetSearch = () => {
    setSearchTitle("");
    setSearchCategory("");
    setIsSearching(false);
  };

  //search api
  const handleSearch = async () => {
    const searchResponse = await get(`/api/videocourse/search?title=${searchTitle}&category=${searchCategory}`)
    // console.log("searchResponse", searchResponse.data.data.userCount);
    if (searchResponse.data.userCount === 0) {
      toast.warning("No Search Results Found");
    } else {
      setVideoData(searchResponse.data.data);
      setVideoCount(searchResponse.data.userCount);
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
                Video Course List
              </h4>
              <Link to="/addvideocourse" className="blu-btn">
                <i className="far fa-plus me-2" />
                Add Video Course
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
                    Video Course
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
                      Total Video Courses ({videoCount})
                    </h4>
                  </div>
                  <div className="col-lg-5 w-100">
                    <form>
                      <div className="row w-100 justify-content-end gx-2 align-items-center">
                        <div className="col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Title"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Category"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-2">
                          <button
                            type="button"
                            onClick={handleSearchSubmit}
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
                      <th>COURSE NAME</th>
                      <th>CATEGORY</th>
                      <th>CATEGORY SEQUENCE</th>
                      <th>PRICE</th>
                      <th>OFFER PRICE</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoData &&
                      videoData.map((curElem, index) => {
                        return (
                          <tr key={curElem._id}>
                            <th>{++index + 10 * (page - 1)}</th>
                            <th>
                              <img
                                src={baseurl + "/" + curElem.images[0].image}
                                className="img-40"
                                alt="img"
                              />
                            </th>
                            <td>{curElem.title}</td>
                            <td>{curElem.videoCategory.category}</td>
                            <td>{curElem.videoCategory.categorySequence}</td>
                            <td>{curElem.price}</td>
                            <td>{curElem.offerPrice}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  onChange={() =>
                                    handleVideoStatus(curElem._id)
                                  }
                                  className="form-check-input"
                                  type="checkbox"
                                  // defaultChecked=""
                                  checked={
                                    videoStatus.find(
                                      (video) => video.id === curElem._id
                                    )?.status
                                  }
                                />
                              </div>
                            </td>
                            <td className="d-flex">
                              <Link
                                to={`/videocourseedit/${curElem._id}`}
                                className="mx-2"
                              >
                                <img src={edit} alt="" />
                              </Link>
                              <button className="mx-2">
                                <img
                                  src={trash}
                                  alt=""
                                  onClick={() => handleVideoDelete(curElem._id)}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {!isSearching && (
                  <Pagination
                    currentPage={page}
                    onPageChange={handlePageChange}
                    totalItems={videoCount}
                    itemPerPage={itemPerPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoCourseList;
