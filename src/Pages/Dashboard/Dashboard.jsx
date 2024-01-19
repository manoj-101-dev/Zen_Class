// Importing necessary dependencies and assets
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import profile from "../../assets/profile.jpg";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

// Functional component definition for the 'Dashboard' component
function Dashboard() {
  // State for managing the display of logout option
  const [showLogoutOption, setShowLogoutOption] = useState(false);

  // Function to handle profile click and toggle the logout option display
  const handleProfileClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  // Hook to navigate between pages
  const navigate = useNavigate();

  // Function to handle logout and navigate to the home page
  const handleLogout = () => {
    navigate("/");
  };

  // State for managing the selected date on the calendar
  const [value, onChange] = useState(new Date());

  // Data for Codekatta and Webkatta charts
  const codekattaData = [
    { day: "Sun", value: 10 },
    { day: "Mon", value: 209 },
    { day: "Tue", value: 100 },
    { day: "Wed", value: 50 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 10 },
    { day: "Sat", value: 10 },
  ];

  const webkattaData = [
    { day: "Sun", value: 50 },
    { day: "Mon", value: 150 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 30 },
    { day: "Thu", value: 100 },
    { day: "Fri", value: 20 },
    { day: "Sat", value: 5 },
  ];

  // Recharts Bar Chart components for Codekatta and Webkatta
  const rechartsBarChartCodekatta = (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={codekattaData} layout="vertical">
        <YAxis type="category" dataKey="day" width={100} />
        <XAxis type="number" hide={true} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );

  const rechartsBarChartWebkatta = (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={webkattaData} layout="vertical">
        <YAxis type="category" dataKey="day" width={100} />
        <XAxis type="number" hide={true} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="dashboard-container">
      {/* Navbar section */}
      <div className="navbar">
        <h2>DashBoard</h2>
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

      {/* Chart section with Calendar, Status, and Activities */}
      <div className="chart-section">
        <h1 className="calendar-header">Attendance</h1>
        <div className="calendar-container">
          {/* Calendar component */}
          <Calendar onChange={onChange} value={value} calendarType="gregory" />
          {/* Status section */}
          <div className="status-heading">
            <h2>Status</h2>
          </div>
          <div className="status-container">
            <div className="status-item">
              <div className="dot present-dot"></div>
              <span>Present</span>
            </div>
            <div className="status-item">
              <div className="dot absent-dot"></div>
              <span>Absent</span>
            </div>
            <div className="status-item">
              <div className="dot holiday-dot"></div>
              <span>Holiday</span>
            </div>
          </div>
        </div>
        {/* Activities section with Codekatta and Webkatta charts */}
        <h2 className="title">Activities</h2>
        <div className="chart-container">
          <div>
            {/* Codekatta chart */}
            <div className="chart-header">
              <h3>Codekatta</h3>
              <h5>Points earned: 1195</h5>
            </div>
            {rechartsBarChartCodekatta}
          </div>
          <div className="chart-item">
            {/* Webkatta chart */}
            <div className="chart-header">
              <h3>Webkatta</h3>
              <h5>Points earned: 425</h5>
            </div>
            {rechartsBarChartWebkatta}
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the 'Dashboard' component as the default export
export default Dashboard;
