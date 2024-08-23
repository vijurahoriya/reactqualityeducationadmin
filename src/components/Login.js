import React, { useEffect, useState } from "react";
import loginlogo from "../assets/images/login-logo.png";
import loginimg from "../assets/images/login-img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "./helper/baseurl";
// assets/images/login-img.png
export const Login = () => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      navigate("/", { replace: false });
    }
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    //  console.log({phone,pin});
    await axios
      .post(`${baseurl}/api/user/login`, { phone, pin })
      .then((res) => {
        console.log("res", res);
        if (res.data.status === false) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/");
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };
  return (
    <>
      <section className="main-login">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-xl-6 b-center bg-size d-none d-lg-block d-xl-block"
              style={{
                backgroundImage: `url(${loginimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                display: "block",
              }}
            >
              <div className="login-lft">
                <div className="login-lft-innr">
                  <h3>Welcome</h3>
                  <img src={loginlogo} alt="" />
                  <p className="text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Optio vel, laborum omnis atque quisquam ducimus, eius
                    expedita alias! Repellat alias sint at dignissimos adipisci
                    quis vitae quod culpa labore voluptatum.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 p-0">
              <div className="login-card">
                <form action="" className="login-form" onSubmit={handleLogin}>
                  <h4>
                    <span>Login</span>
                  </h4>
                  <div className="mb-4 frm-bx">
                    <label htmlFor="" className="form-label">
                      User Name/Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter User Name/Mobile Number"
                    />
                    <span className="fas fa-user" />
                  </div>
                  <div className="mb-5 frm-bx">
                    <label htmlFor="" className="form-label">
                      Password/Pin
                    </label>
                    <input
                      type="password"
                      value={pin}
                      className="form-control"
                      placeholder="Enter Password/Pin"
                      onChange={(e) => setPin(e.target.value)}
                    />
                    <span className="fas fa-lock" />
                  </div>
                  <div className="mb-4 mt-5 frm-bx">
                    <button className="frm-btn w-100" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
