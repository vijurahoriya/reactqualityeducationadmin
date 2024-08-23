import React from "react";
import cardicon1 from "../assets/images/card-icon-01.svg";
import cardicon2 from "../assets/images/card-icon-02.svg";
import cardicon3 from "../assets/images/card-icon-03.svg";
import cardicon4 from "../assets/images/card-icon-04.svg";
import cardicon5 from "../assets/images/card-icon-05.svg";
import cardicon6 from "../assets/images/card-icon-06.svg";
import cardicon7 from "../assets/images/card-icon-07.svg";
import cardicon8 from "../assets/images/card-icon-08.svg";
import BarChart from "./BarChart";
const Home = () => {
  return (
    <>
      <section className="main-sec" style={{overflow:"hidden"}}>
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fas fa-home me-2" />
                Dashboard
              </h4>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <a href="javascript:void(0);">
                  <div className="dash-card prple-clr">
                    <p>Total Page Views</p>
                    <h5>
                      <span className="counter">400</span> +
                    </h5>
                    <img src={cardicon1} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <a href="user-list.html">
                  <div className="dash-card sky-clr">
                    <p>Total Users</p>
                    <h5>
                      <span className="counter">3</span>
                    </h5>
                    <img src={cardicon2} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <a href="javascript:void(0);">
                  <div className="dash-card org-clr">
                    <p>Total Order</p>
                    <h5>
                      <span className="counter">120</span>
                    </h5>
                    <img src={cardicon3} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <a href="javascript:void(0);">
                  <div className="dash-card pnk-clr">
                    <p>Total Sales</p>
                    <h5>
                      <span className="counter">40</span> +
                    </h5>
                    <img src={cardicon4} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <a href="javascript:void(0);">
                  <div className="dash-card grn-clr">
                    <p>Total Sales</p>
                    <h5>
                      <span className="counter">40</span> +
                    </h5>
                    <img src={cardicon5} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <a href="javascript:void(0);">
                  <div className="dash-card aqa-clr">
                    <p>Total Sales</p>
                    <h5>
                      <span className="counter">40</span> +
                    </h5>
                    <img src={cardicon6} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <a href="javascript:void(0);">
                  <div className="dash-card brwn-clr">
                    <p>Total Sales</p>
                    <h5>
                      <span className="counter">40</span> +
                    </h5>
                    <img src={cardicon7} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <a href="javascript:void(0);">
                  <div className="dash-card lgt-grn-clr">
                    <p>Total Sales</p>
                    <h5>
                      <span className="counter">40</span> +
                    </h5>
                    <img src={cardicon8} alt="" className="card-icon" />
                  </div>
                </a>
              </div>
              <div className="col-lg-12">
                <div className="cards">
                  <div className="d-flex justify-content-between fltr mb-3">
                    <h4 className="dash-head">Earnings</h4>
                    <select name=" " id="" className="form-select">
                      <option value="">Day</option>
                      <option value="">Weak</option>
                      <option value="">Month</option>
                      <option value="">Year</option>
                    </select>
                  </div>
                  {/* <canvas id="chart" width="1000" height="400" /> */}
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="cards">
              <h4 className="dash-head">Today's Earnings</h4>
              <ul className="earning-list">
                <li>
                  <span>Video Courses</span>
                  <span>55 sales</span>
                  <span>₹3446</span>
                </li>
                <li>
                  <span>Test Series</span>
                  <span>46 sales</span>
                  <span>₹6446</span>
                </li>
                <li>
                  <span>Other</span>
                  <span>2 sales</span>
                  <span>₹346</span>
                </li>
              </ul>
            </div>
            <div className="cards">
              <div className="d-flex justify-content-between fltr">
                <h4 className="dash-head">User Add</h4>
                <select name=" " id="" className="form-select">
                  <option value="">Day</option>
                  <option value="">Weak</option>
                  <option value="">Month</option>
                  <option value="">Year</option>
                </select>
              </div>
              <canvas id="barChart" />
          
            </div>
            <div className="cards know-abt">
              <div className="know-abt-innr">
                <a
                  href="javascript:void(0);"
                  className="watch-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#video-popup"
                >
                  <i className="fas fa-play" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade video"
        id="video-popup"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <iframe
                width="100%"
                height={500}
                src="https://www.youtube.com/embed/yAoLSRbwxL8?si=jQNYMNhkHAWel9v2"
                title="YouTube video player"
                frameBorder="{0}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen=""
              />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Home;
