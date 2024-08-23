import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseurl } from "../helper/baseurl";
import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";
import { toast } from "react-toastify";
import Pagination from "../helper/Pagination";
import { get, post, put } from "../helper/api";

const LiveVideoCourseList = () => {
  const [liveVideoData, setLiveVideoData] = useState([]);
  const [liveVideoStatus, setLiveVideoStatus] = useState([]);
  const [liveVideoCount, setLiveVideoCount] = useState(1);
  const [page, setPage] = useState(1);
  const [liveVideoSearch, setLiveVideoSearch] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const itemPerPage = 10;

  useEffect(() => {
    if (isSearching) {
      handleLiveVideoSearch();
    } else {
      fetchLiveVideoData();
    }
  }, [page,isSearching]);

  const fetchLiveVideoData = async () => {
    try {
      const liveResponse = await get(`/api/livevideocourse/allcourses?p=${page}`)
      console.log("liveResponse", liveResponse.data);
      setLiveVideoData(liveResponse.data);
      const initialStatus = liveResponse?.data?.map((live) => ({
        id: live._id,
        status: live.isActive,
      }));
      //  console.log("initialStatus",initialStatus)
      setLiveVideoStatus(initialStatus);
      setLiveVideoCount(liveResponse.data.length);
    } catch (error) {
      console.log("live video data fatching error", error);
    }
  };

  //lilve video status api
  const handleLiveVideoStatus = async (id) => {
    try {
      const statusResponse = await put(`/api/livevideocourse/activevideo/${id}`)
      // console.log("statusResponse", statusResponse.data);
      const updatedLiveStatus = liveVideoStatus.map((live) =>
        live.id === id
          ? { ...live, status: statusResponse?.data?.isActive }
          : live
      );
      setLiveVideoStatus(updatedLiveStatus);
    } catch (error) {
      console.log("live video status change error", error);
    }
  };
  // delete live video api
  const handleLiveVideoDelete = async (id) => {
    try {
      const delResponse = await post(`/api/livevideocourse/deletecourse/${id}`)
      setLiveVideoData(liveVideoData.filter((live) => live._id !== id));
      // console.log("ho gya delete", delResponse);
      toast.success(delResponse.data.message);
    } catch (error) {
      console.log("error in live video deleting", error);
      toast.danger("live video delete error");
    }
  };

  // pagination
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleLiveVideoSearch = async () => {
    try {
      const searchResponse = await get(`/api/livevideocourse/search?title=${liveVideoSearch}`)
      console.log(searchResponse.data.userCount)
      
      if (searchResponse.data.userCount === 0) {
        toast.warning("No search results found");
      }else{
        setLiveVideoData(searchResponse.data.data)
      }
      setLiveVideoCount(searchResponse.data.userCount)
    } catch (error) {
      console.log("live video course search error", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setPage(1);
  };
  const handleResetSearch = () => {
    setLiveVideoSearch("");
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
                Live Video Course List
              </h4>
              <Link to="/addlivevideocourse" className="blu-btn">
                <i className="far fa-plus me-2" />
                Add Live Video Course
              </Link>
            </div>
            <div className="custom-bredcump">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Live Video Courses</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Live Video Course List
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
                      Live Video Course List({liveVideoCount})
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
                            value={liveVideoSearch}
                            onChange={(e) => setLiveVideoSearch(e.target.value)}
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
                      <th>COURSE NAME</th>
                      <th>CATEGORY</th>
                      <th>PRICE</th>
                      <th>OFFER PRICE</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveVideoData &&
                      liveVideoData?.map((curElem, index) => {
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
                            <td>{curElem.price}</td>
                            <td>{curElem.offerPrice}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  onChange={() =>
                                    handleLiveVideoStatus(curElem._id)
                                  }
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultChecked=""
                                  checked={
                                    liveVideoStatus.find(
                                      (live) => live.id === curElem._id
                                    )?.status
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <Link
                                to={`/editlivevideocourse/${curElem._id}`}
                                className="mx-2"
                              >
                                <img src={edit} alt="edit" />
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  handleLiveVideoDelete(curElem._id)
                                }
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
                  totalItems={liveVideoCount}
                  itemPerPage={itemPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LiveVideoCourseList;
