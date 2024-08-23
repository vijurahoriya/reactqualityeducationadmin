import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  },[]);

  return <Component />;
};

export default PrivateRoute;

// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// const PrivateRoute = () => {
//   const isLoggedIn = !!window.localStorage.getItem("token")
//        console.log("first",isLoggedIn)
//   return (
//     <>
//       {isLoggedIn === true ? <Outlet/> : <Navigate to="/login" />}
//     </>
//   )
// }

// export default PrivateRoute
