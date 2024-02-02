// Importing necessary dependencies and components
import { useLocation } from "react-router-dom";
import SideBar from "../Components/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";

// Importing pages/components that will be rendered in the layout
import Class from "../Pages/Class/Class";
import Login from "../Pages/Login/Login";
import DashBoard from "../Pages/Dashboard/Dashboard";
import Queries from "../Pages/Queries/Queries";
import LeaveApplications from "../Pages/Leave/Leave";
import Certificate from "../Pages/Certificate/Certificate";
import Signup from "../Pages/Signup/Signup";
import Task from "../Pages/Task/Task";
import { useState } from "react";

// Functional component definition for the layout
const Layout = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);

  const handleFormSubmit = (newSubmission) => {
    setFormSubmissions([...formSubmissions, newSubmission]);
  };
  // Accessing the current location using useLocation hook
  const location = useLocation();

  // Checking whether to display the sidebar based on the current route
  const shouldDisplaySideBar = !["/", "/signup"].includes(
    location.pathname.toLowerCase().trim()
  );

  return (
    <div className="layout">
      <div className="content">
        {/* Defining routes using the Routes and Route components from react-router-dom */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/class"
            element={
              <Class
                formSubmissions={formSubmissions}
                onFormSubmit={handleFormSubmit}
              />
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/Queries" element={<Queries />} />
          <Route path="/Leave Applications" element={<LeaveApplications />} />
          <Route
            path="/task"
            element={<Task formSubmissions={formSubmissions} />}
          />
          <Route path="/Certificate" element={<Certificate />} />
        </Routes>
      </div>

      {/* Displaying the sidebar conditionally based on the route */}
      {shouldDisplaySideBar && <SideBar />}
    </div>
  );
};

// Exporting the Layout component as the default export
export default Layout;
