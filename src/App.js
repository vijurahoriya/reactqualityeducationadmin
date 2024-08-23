import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/bootstrap.min.css";
import "./assets/css/dashboard.css";
import "./assets/css/dashboard-responsive.css";
import 'font-awesome/css/font-awesome.min.css'; 
import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./assets/images/favicon.png";
import Home from "./components/Home";
import { Login } from "./components/Login"; // Assuming Login is default export
import UserList from "./components/users/UserList";
import Layout from "./components/Layout";
import PrivateRoute from "./components/routes/PrivateRoute";
import VideoCourseList from "./components/videocourses/VideoCourseList";
import AddUser from "./components/users/AddUser";
import AddVideoCourse from "./components/videocourses/AddVideoCourse";
import AddCourseCategory from "./components/videocourses/AddCourseCategory";
import CategoryList from "./components/videocourses/CategoryList";
import LiveVideoCourseList from "./components/livevideocourses/LiveVideoCourseList";
import AddLiveVideoCourse from "./components/livevideocourses/AddLiveVideoCourse";
import LiveVideoCourseCategoryList from "./components/livevideocourses/LiveVideoCourseCategoryList";
import EditData from "./components/users/EditData";
import EditVideoCourse from "./components/videocourses/EditVideoCourse";
import { ToastContainer } from "react-toastify";
import EditCategoryList from "./components/videocourses/EditCategoryList";
import EditLiveVideoCourse from "./components/livevideocourses/EditLiveVideoCourse";
import EditLiveVideoCourseCategory from "./components/livevideocourses/EditLiveVideoCourseCategory";
import TextEditor from "./components/TextEditor";
import AddLiveVideoCourseCategory from "./components/livevideocourses/AddLiveVideoCourseCategory";
import PreLoader from "./components/helper/PreLoader";
import ReactChart from "./components/ReactChart";

function App() {
  return (
    <>
     <BrowserRouter>
     <PreLoader/>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute component={Layout} />}>
            <Route index element={<PrivateRoute component={Home} />} />
            <Route
              path="/userlist"
              element={<PrivateRoute component={UserList} />}
            />
             <Route
              path="/texteditor"
              element={<PrivateRoute component={TextEditor} />}
            />
             <Route
              path="/reactchart"
              element={<PrivateRoute component={ReactChart} />}
            />

            <Route
              path="/videocourselist"
              element={<PrivateRoute component={VideoCourseList} />}
            />
            <Route
              path="/adduser"
              element={<PrivateRoute component={AddUser} />}
            />
            <Route
              path="/addvideocourse"
              element={<PrivateRoute component={AddVideoCourse} />}
            />
            <Route
              path="/addcoursecategory"
              element={<PrivateRoute component={AddCourseCategory} />}
            />
            <Route
              path="/categorylist"
              element={<PrivateRoute component={CategoryList} />}
            />
            <Route
              path="/livevideocourselist"
              element={<PrivateRoute component={LiveVideoCourseList} />}
            />
            <Route
              path="/addlivevideocourse"
              element={<PrivateRoute component={AddLiveVideoCourse} />}
            />
            <Route
              path="/livevideocoursecategorylist"
              element={<PrivateRoute component={LiveVideoCourseCategoryList} />}
            />
            <Route
              path="/edit/:id"
              element={<PrivateRoute component={EditData} />}
            />
             <Route
              path="/videocourseedit/:id"
              element={<PrivateRoute component={EditVideoCourse} />}
            />
             <Route
              path="/editcategorylist/:id"
              element={<PrivateRoute component={EditCategoryList} />}
            />
             <Route
              path="/editlivevideocourse/:id"
              element={<PrivateRoute component={EditLiveVideoCourse} />}
            />
             <Route
              path="/editlivevideocoursecategory/:id"
              element={<PrivateRoute component={EditLiveVideoCourseCategory} />}
            />
             <Route
              path="/addlivevideocoursecategory"
              element={<PrivateRoute component={AddLiveVideoCourseCategory} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer /> 
    </>
  );
}

export default App;
