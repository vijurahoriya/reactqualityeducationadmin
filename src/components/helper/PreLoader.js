import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PreLoader = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const excludedPaths = [
      "/login",
      "/addvideocourse",
      "/addcoursecategory",
      "/addlivevideocourse",
      "/addlivevideocoursecategory"
    ];

    if (excludedPaths.includes(location.pathname)
      // location.pathname === "/login" ||
      // location.pathname === "/addvideocourse" ||
      // location.pathname === "/addcoursecategory" ||
      // location.pathname === "/addlivevideocourse" ||
      // location.pathname === "/addlivevideocoursecategory"
    ) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
      const timer = setTimeout(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
          preloader.style.display = "none";
          setShowLoader(false);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  return (
    <>
      {showLoader && (
        <div id="preloader">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreLoader;
