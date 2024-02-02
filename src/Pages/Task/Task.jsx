import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import profile from "../../assets/profile.jpg";
import { BsClock } from "react-icons/bs";
import "./task.css";

const Task = () => {
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch task submissions here
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          "https://zen-class-lxyk.onrender.com/AllTasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const submissions = await response.json();
          setFormSubmissions(submissions);
        } else {
          console.error("Failed to fetch task submissions");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchSubmissions();
  }, []); // Run the effect once on component mount

  const handleProfileClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleDelete = async (taskId) => {
    // Implement the logic to delete the task with taskId
    try {
      const response = await fetch(
        `https://zen-class-lxyk.onrender.com/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        // If deletion is successful, update the state to reflect the change
        setFormSubmissions((prevSubmissions) =>
          prevSubmissions.filter((submission) => submission._id !== taskId)
        );
        console.log("Task deleted successfully");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  return (
    <div id="class task">
      <div className="navbar">
        <h2>Task Submissions</h2>
        <div className="user">
          <h4>User</h4>
          <img
            src={profile}
            className="img"
            onClick={handleProfileClick}
            alt="profile"
          />
          {showLogoutOption && (
            <h5 className="logout-option" onClick={handleLogout}>
              Logout
            </h5>
          )}
        </div>
      </div>
      <Card id="task-card">
        <Card.Body>
          {formSubmissions.length > 0 ? (
            formSubmissions.map((submission) => (
              <div
                key={submission._id}
                className="form-submission"
                style={{ marginBottom: "20px" }}
              >
                <div className="task-data">
                  <h3>Task 1</h3>
                </div>
                {/* Include other details from the submission object */}
                <p>Submitted On: {new Date().toDateString()}</p>
                <p>Title: Javascript Day 1</p>
                <div className="date">
                  <Card.Text></Card.Text>
                </div>
                <div className="task-content">
                  <div className="text-warning">
                    <BsClock size={20} />
                    <span className="ms-2"> Yet to be graded</span>
                  </div>
                  <Button
                    className="del-task"
                    onClick={() => handleDelete(submission._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No Task Submitted yet.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Task;
