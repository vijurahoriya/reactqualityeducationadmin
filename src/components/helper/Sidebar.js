// import React, { useState } from "react";
// import headlogo from "../../assets/images/head-logo.png";
// import { Link } from "react-router-dom";
// const Sidebar = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isActive1, setIsActive1] = useState(false);
//   const toggleSubMenu = () => {
//     setIsActive(!isActive);
//   };
//   const toggleSubMenu1 = () => {
//     setIsActive1(!isActive1);
//   };
//   return (
//     <>
//       <div className="dash-menu">
//         <div className="dashbord-logo">
//           <Link to="/" className="navbar-brand">
//             <img src={headlogo} alt="head-logo" />
//           </Link>
//           <a href="javascript:void(0)" className="toggle cross-icon">
//             <i className="fas fa-chevron-left" />
//           </a>
//         </div>
//         <div className="dash-menu-bar">
//           <nav className="nav-menu navbar" id="navbar">
//             <ul>
//               <li className="nav-item">
//                 <Link to="/" className="nav-link">
//                   <span className="fas fa-home me-1 icon" />
//                   dashboard
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/userlist" className="nav-link">
//                   <span className="fas fa-users me-1 icon" />
//                   Users
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/texteditor" className="nav-link">
//                   <span className="fas fa-users me-1 icon" />
//                   TextEditor
//                 </Link>
//               </li>
//               <li
//                 className={`nav-item dropdown has-submenu ${isActive ? "new-menu" : ""}`}
//                 onClick={() => toggleSubMenu()}
//               >
//                 <a
//                   className="nav-link"      
//                   aria-expanded={isActive ? "true" : "false"}
//                   href="javascript:void(0)"
//                 >
//                   <span className="fa fa-video me-1 icon" />
//                   Video Courses
//                 </a>
//                 <ul
//                   className={`submenu collapse ${isActive ? "show" : ""}`}
//                   onClick={() => toggleSubMenu()}
//                 >
//                   <li>
//                     <Link className="dropdown-item" to="/videocourselist">
//                       Video Courses List
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/addvideocourse">
//                       Add Video Courses
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/addcoursecategory">
//                       Add Video Course Category{" "}
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/categorylist">
//                       Category List{" "}
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li
//                 className={`nav-item has-submenu ${
//                   isActive1 ? "new-menu" : ""
//                 }`}
//                 onClick={() => toggleSubMenu1()}
//               >
//                 <a
//                   className="nav-link"
//                   aria-expanded={isActive ? "true" : "false"}
//                   href="javascript:void(0)"
//                 >
//                   <span className="fa fa-video me-1 icon" />
//                   Live Video Courses
//                 </a>
//                 <ul
//                   className={`submenu collapse ${isActive1 ? "show" : ""}`}
//                   onClick={() => toggleSubMenu1()}
//                 >
//                   <li>
//                     <Link className="dropdown-item" to="/livevideocourselist">
//                       Live Video Courses List
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/addlivevideocourse">
//                       Add Live Video Courses
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/addlivevideocoursecategory"
//                     >
//                       Add Live Video Courses Category
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/livevideocoursecategorylist"
//                     >
//                       Live Video Courses Category List{" "}
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




import React, { useState } from "react";
import headlogo from "../../assets/images/head-logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Manage active state of menus
  const [activeMenu, setActiveMenu] = useState(null);
  // console.log("activeMenu",activeMenu)
  // Function to toggle the active menu
  const toggleMenu = (menu) => {
    console.log("menuaaya",menu)
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <>
      <div className="dash-menu">
        <div className="dashbord-logo">
          <Link to="/" className="navbar-brand">
            <img src={headlogo} alt="head-logo" />
          </Link>
          <a href="javascript:void(0)" className="toggle cross-icon">
            <i className="fas fa-chevron-left" />
          </a>
        </div>
        <div className="dash-menu-bar">
          <nav className="nav-menu navbar" id="navbar">
            <ul>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span className="fas fa-home me-1 icon" />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/userlist" className="nav-link">
                  <span className="fas fa-users me-1 icon" />
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/texteditor" className="nav-link">
                  <span className="fas fa-users me-1 icon" />
                  TextEditor
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/reactchart" className="nav-link">
                  <span className="fas fa-users me-1 icon" />
                  ReactChart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/popuplist" className="nav-link">
                  <span className="fas fa-users me-1 icon" />
                  AddPopup
                </Link>
              </li>
              <li
                className={`nav-item dropdown has-submenu ${activeMenu === 'videoCourses' ? "new-menu" : ""}`}
                onClick={() => toggleMenu('videoCourses')}
              >
                <a
                  className="nav-link"
                  aria-expanded={activeMenu === 'videoCourses' ? "true" : "false"}
                  href="javascript:void(0)"
                >
                  <span className="fa fa-video me-1 icon" />
                  Video Courses
                </a>
                <ul
                  className={`submenu collapse ${activeMenu === 'videoCourses' ? "show" : ""}`}
                >
                  <li>
                    <Link className="dropdown-item" to="/videocourselist">
                      Video Courses List
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/addvideocourse">
                      Add Video Courses
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/addcoursecategory">
                      Add Video Course Category
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/categorylist">
                      Category List
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item has-submenu ${activeMenu === 'liveVideoCourses' ? "new-menu" : ""}`}
                onClick={() => toggleMenu('liveVideoCourses')}
              >
                <a
                  className="nav-link"
                  aria-expanded={activeMenu === 'liveVideoCourses' ? "true" : "false"}
                  href="javascript:void(0)"
                >
                  <span className="fa fa-video me-1 icon" />
                  Live Video Courses
                </a>
                <ul
                  className={`submenu collapse ${activeMenu === 'liveVideoCourses' ? "show" : ""}`}
                >
                  <li>
                    <Link className="dropdown-item" to="/livevideocourselist">
                      Live Video Courses List
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/addlivevideocourse">
                      Add Live Video Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/addlivevideocoursecategory"
                    >
                      Add Live Video Courses Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/livevideocoursecategorylist"
                    >
                      Live Video Courses Category List
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
