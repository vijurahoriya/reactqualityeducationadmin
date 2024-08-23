import React from 'react'
import avtar from "../../assets/images/avtar.jpg";
import { useNavigate } from 'react-router-dom';

const Header = () => {
const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("token")
    navigate('/login')
    window.location.reload();
  }
  return (
    <>
     <header className="header">
        <div className="navbar-header">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6 col-sm-6 col-6">
              <div className="header-fltr">
                <a href="javascript:void(0);" className="toggle">
                  <i className="fas fa-times" />
                </a>
                <form action="">
                  <div className="header-fltr-bx">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type here..."
                    />
                    <span className="fas fa-search" />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-6">
              <div className="app-header-right-side">
                <ul className="app-header-right-side-list">
                  <li>
                    <button type="button" className="position-relative">
                      <i className="far fa-bell" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                        1
                      </span>
                    </button>
                  </li>
                </ul>
                <div className="prfl-bar">
                  <div className="prfl-bar-img">
                    <img src={avtar} className="profle" alt="" />
                  </div>
                  <div className="prfl-bar-content">
                    <div className="dropdown">
                      <button
                        className="dropdown-toggle"
                        type="button"
                        id="profile-menu"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Suneel Sharma
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="profile-menu"
                      >
                        <li>
                          <a href="javascript:void(0);">
                            <i className="far fa-user-circle me-2" />
                            Switch to user view
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            <i className="fal fa-cog me-2" />
                            Setting
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            <i className="fal fa-bell me-2" />
                            Notification
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            <i className="fal fa-gift me-2" />
                            Perk Marketplace
                          </a>
                        </li>
                        <li>
                          <button  onClick={handleLogout}>
                            <i className="fal fa-sign-out-alt me-2" />
                            Signout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header