// Importing necessary dependencies and components
import { Image } from "react-bootstrap";
import { AiOutlineFileSearch } from "react-icons/ai";
import { PiAddressBookFill } from "react-icons/pi";
import { MdDescription, MdAssignmentAdd, MdBallot } from "react-icons/md";
import zen from "../../assets/zen.jpg";
import "./SideBar.css"; // Importing the stylesheet
import { Link } from "react-router-dom";
import { BiTask } from "react-icons/bi";

// Functional component definition for the Sidebar
const SideBar = () => {
  return (
    <div className="sidebar">
      {/* Sidebar item for displaying the student information */}
      <div className="sidebar-item">
        <Image src={zen} className="zen-img" alt="Zen" />
        <span className="item">
          <b>Student</b>
        </span>
      </div>

      {/* Sidebar item with a link to the "Class" page */}
      <div className="sidebar-item">
        <Link to="/class" className="sidebar-link">
          <PiAddressBookFill className="icon" />
          <span className="item-text">Class</span>
        </Link>
      </div>

      {/* Sidebar item with a link to the "Dashboard" page */}
      <div className="sidebar-item">
        <Link to="/dashboard" className="sidebar-link">
          <AiOutlineFileSearch className="icon" />
          <span className="item-text">DashBoard</span>
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/task" className="sidebar-link">
          <BiTask className="icon" />
          <span className="item-text">Task</span>
        </Link>
      </div>
      {/* Sidebar item with a link to the "Queries" page */}
      <div className="sidebar-item">
        <Link to="/Queries" className="sidebar-link">
          <MdAssignmentAdd className="icon" />
          <span className="item-text">Queries</span>
        </Link>
      </div>

      {/* Sidebar item with a link to the "Leave Applications" page */}
      <div className="sidebar-item">
        <Link to="/Leave Applications" className="sidebar-link">
          <MdBallot className="icon" />
          <span className="item-text">Leave Applications</span>
        </Link>
      </div>

      {/* Sidebar item with a link to the "Certificate" page */}
      <div className="sidebar-item">
        <Link to="/Certificate" className="sidebar-link">
          <MdDescription className="icon" />
          <span className="item-text">Certificate</span>
        </Link>
      </div>
    </div>
  );
};

// Exporting the Sidebar component as the default export
export default SideBar;
