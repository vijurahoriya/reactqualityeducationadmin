import React, { useEffect, useState } from "react";
import view from "../../assets/images/view.png";
import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";
import axios from "axios";
import Pagination from "../helper/Pagination";
import { baseurl, header } from "../helper/baseurl";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get } from "../helper/api";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [page, setPage] = useState(1);
  const [usercount, setUserCount] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const itemPerPage = 10;

  useEffect(() => {
    if (isSearching) {
      apidata();
    } else {
      apidata();
    }
  }, [page, isSearching]);

  const apidata = async () => {
    try {
      let response;
      if (searchItem) {
        response = await get(`/api/user/search?search=${searchItem}&p=${page}`)
      } else {
        response = await get(`/api/user/all_data?p=${page}`)
      }

      // console.log("userresponse", response?.data?.data);
      setUserData(response?.data?.data);
      setUserCount(response?.data?.userCount);
      const initialStatus = response?.data?.data?.map((user) => ({
        id: user._id,
        status: user.status,
      }));
      // console.log("initialStatus",initialStatus)
      setUserStatus(initialStatus);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // user status change
  const changeStatus = async (id) => {
    let statusresp = await get(`/api/user/userstatus/${id}`)
    // console.log("statusresp", statusresp?.message);
    const updatedStatus = userStatus.map((user) =>
      user.id === id
        ? { ...user, status: statusresp?.data?.status }
        : user
    );
    // console.log("updated Status", updatedStatus);
    setUserStatus(updatedStatus);
    // console.log("status",userStatus)
    toast.success(statusresp?.message);
  };

  //dob format
  const formatDate = (dateString) => {
    // console.log("first", dateString);
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    // console.log(month < 10 ? "0" + month : month)
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  //pagination
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  //delete data
  const deleteUser = async (id) => {
    //  console.log("delete",id)
    try {
      const res = await get(`/api/user/deleteuser/${id}`)
      setUserData(userData.filter((user) => user._id !== id));
      await apidata();
      // console.log("delere",res)
      toast.success(res?.message);
    } catch (error) {
      console.log("error deleting user", error);
      toast.error("Error deleting user!");
    }
  };
  // handle search
  const handleSearch = () => {
    setPage(1);
    setIsSearching(true);
  };

  // handle Reset Search
  const handleResetSearch = () => {
    setSearchItem("");
    setIsSearching(false);
  };
  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="far fa-chart-bar me-2" />
                Users List
              </h4>
              <Link to="/adduser" className="blu-btn">
                <i className="far fa-plus me-2" />
                Add User
              </Link>
            </div>
            <div className="custom-bredcump">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Users
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
                    <h4 className="table-head">Total Users ({usercount})</h4>
                  </div>
                  <div className="col-lg-5 w-100">
                    <form action="">
                      <div className="row justify-content-end gx-2 align-items-center">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
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
                      <th>USER NAME</th>
                      <th>GENDER</th>
                      <th>DOB</th>
                      <th>EMAIL</th>
                      <th>Number</th>
                      <th>STATUS</th>
                      <th>PIN</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map((curElem, index) => {
                        return (
                          <tr key={curElem._id}>
                            <th>{++index + 10 * (page - 1)}</th>
                            <th>
                              <img
                                src={baseurl + "/" + curElem.profileImg}
                                className="img-40"
                                alt="image"
                              />
                            </th>
                            <td>
                              {curElem.firstName} {curElem.lastName}
                            </td>
                            <td>{curElem.gender}</td>
                            <td>{formatDate(curElem.dob)}</td>
                            <td>{curElem.email}</td>
                            <td>{curElem.phone}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  onChange={() => changeStatus(curElem._id)}
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    userStatus.find(
                                      (user) => user.id === curElem._id
                                    )?.status
                                  }
                                  // defaultChecked=""
                                />
                              </div>
                            </td>
                            <td>{curElem.pin}</td>
                            <td
                             className="d-flex"
                            >
                              <button className="mx-2">
                                <img src={view} alt="view" />
                              </button>
                              <Link
                                className="mx-2"
                                to={`/edit/${curElem._id}`}
                              >
                                <img src={edit} alt="edit" />
                              </Link>
                              <button
                                onClick={() => deleteUser(curElem._id)}
                                className="mx-2"
                              >
                                <img src={trash} alt="delete" />
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
                  totalItems={usercount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserList;
