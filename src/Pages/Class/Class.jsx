/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile.jpg";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import { Button } from "react-bootstrap";
import "./Class.css";
import Activities from "../Activities/Activities";

const Class = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [formSubmissions, setFormSubmissions] = useState([]);
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleProfileClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newSubmission = {
      taskNumber: formSubmissions.length + 1,
      title: "JavaScript Day 1",
      date: new Date().toLocaleDateString(),
    };
  };

  return (
    <div id="class">
      {/* Navbar section */}
      <div className="navbar">
        <h2>Class</h2>
        <div className="user">
          <h4>User</h4>
          <img
            src={profile}
            className="img"
            onClick={handleProfileClick}
            alt="profile"
          />
          {/* Displaying logout option if showLogoutOption is true */}
          {showLogoutOption && (
            <h5 className="logout-option" onClick={handleLogout}>
              Logout
            </h5>
          )}
        </div>
      </div>

      {/* Head section */}
      <div className="head">
        <h4>Join the class on time!</h4>
      </div>

      {/* Session details section */}
      <div className="session">
        <div className="data">
          <h4>
            <b>JavaScript - Day -1: Introduction to Browser & web</b>
          </h4>
          <p>28/08/2024 - Monday - 8:00 AM : 11:00 AM</p>
          <hr />
          <h6>
            <b>Contents:</b>
          </h6>
          <p>
            Introduction to web Browser Wars DOM tree CSSOM tree, <br />
            Browser internals - HTML parser, <br /> CSS parser, JavaScript V8
            engine, <br />
            internals IP – MAC address – Ports & Evolution of HTTP, <br /> HTTP
            Methods <br />
          </p>
          <h6>
            <b>Pre-Read:</b>
          </h6>
          <p>No preread available</p>
        </div>
      </div>

      {/* Roadmap section */}
      <div className="roadmap">
        <h4>Session Roadmap</h4>
        <div className="circle">1</div>
        <div className="circle">2</div>
        <div className="circle">3</div>
        <div className="circle">4</div>
        <div className="circle circle1 circle2">5</div>
        <div className="circle circle2">10</div>
        <div className="circle">9</div>
        <div className="circle">8</div>
        <div className="circle">7</div>
        <div className="circle circle1 ">6</div>
        <div className="circle">11</div>
        <div className="circle">12</div>
        <div className="circle">13</div>
        <div className=" circle">14</div>
        <div className="circle circle1 circle2">15</div>
        <div className="circle circle2">20</div>
        <div className="circle">19</div>
        <div className="circle">18</div>
        <div className="circle">17</div>
        <div className=" circle circle1">16</div>
        <div className="circle">21</div>
        <div className="circle">22</div>
        <div className="circle">23</div>
        <div className="circle">24</div>
        <div className="circle circle1 circle2">25</div>
        <div className="circle circle2">30</div>
        <div className="circle">29</div>
        <div className="circle">28</div>
        <div className="circle">27</div>
        <div className=" circle circle1">26</div>
        <div className="circle">31</div>
        <div className="circle">32</div>
        <div className="circle">33</div>
      </div>

      {/* Activities section */}
      <Activities
        showFullContent={showFullContent}
        handleFormSubmit={handleFormSubmit}
        toggleContent={toggleContent}
      />

      <Button variant="link" id="arrow-button" onClick={toggleContent}>
        {showFullContent ? <HiChevronDoubleDown /> : <HiChevronDoubleUp />}
      </Button>
    </div>
  );
};

export default Class;
