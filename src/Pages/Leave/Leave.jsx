/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import profile from "../../assets/profile.jpg";
import "./Leave.css";
import { useNavigate } from "react-router-dom";
import { useLeaveContext } from "./LeaveContext";

const LeaveApplications = () => {
  // Accessing the state and dispatch function from the leave context
  const { state, dispatch } = useLeaveContext();
  const navigate = useNavigate();

  // Function to handle profile click and toggle logout option visibility
  const handleProfileClick = () => {
    dispatch({
      type: "SET_SHOW_LOGOUT_OPTION",
      payload: !state.showLogoutOption,
    });
  };

  // Function to handle user logout
  const handleLogout = () => {
    navigate("/");
  };

  // Function to show leave application modal
  const handleShowModal = () =>
    dispatch({ type: "SET_SHOW_MODAL", payload: true });

  // Function to close leave application modal
  const handleCloseModal = () =>
    dispatch({ type: "SET_SHOW_MODAL", payload: false });

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_FORM_DATA",
      payload: { ...state.formData, [name]: value },
    });
  };

  // Function to add leave application
  const handleAddApplication = async () => {
    // Validating the form data
    const isValid =
      (state.formData.days === "1" && state.formData.from) ||
      ((state.formData.days === "2" ||
        state.formData.days === "More than Two") &&
        state.formData.from &&
        state.formData.to) ||
      state.formData.options;

    if (isValid) {
      try {
        // Sending a POST request to add leave application
        const response = await fetch(
          "https://zen-class-lxyk.onrender.com/leaveApplication",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.authToken}`,
            },
            credentials: "include",
            body: JSON.stringify(state.formData),
          }
        );

        if (response.ok) {
          // Refetch the updated list of leave applications
          const updatedResponse = await fetchApplications();
          if (!updatedResponse.ok) {
            throw new Error(
              `Failed to fetch updated applications. Status: ${updatedResponse.status}`
            );
          }

          const updatedApplications = await updatedResponse.json();
          dispatch({ type: "SET_APPLICATIONS", payload: updatedApplications });

          // Resetting the form data and closing the modal
          dispatch({
            type: "SET_FORM_DATA",
            payload: { days: "", from: "", to: "", options: "" },
          });
          dispatch({ type: "SET_SHOW_MODAL", payload: false });
        } else {
          // Handle error
          console.error("Failed to add application");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Function to fetch all leave applications
  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "https://zen-class-lxyk.onrender.com/allLeaveApplication",
        {
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch applications. Status: ${response.status}`
        );
      }

      return response;
    } catch (error) {
      console.error("Error fetching applications:", error.message);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch leave applications",
      });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Effect hook to fetch leave applications on component mount
  useEffect(() => {
    const fetchApplicationsAndSetState = async () => {
      const response = await fetchApplications();
      if (response) {
        const fetchedApplications = await response.json();
        dispatch({ type: "SET_APPLICATIONS", payload: fetchedApplications });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchApplicationsAndSetState();
  }, [state.authToken]);

  // Function to handle the deletion of a leave application
  const handleDeleteApplication = async (appId) => {
    try {
      dispatch({ type: "SET_DELETING", payload: true });

      const response = await fetch(
        `https://zen-class-lxyk.onrender.com/leaveApplication/${appId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        // Remove the deleted application from the state
        dispatch({
          type: "SET_APPLICATIONS",
          payload: state.applications.filter((app) => app._id !== appId),
        });

        console.log("Leave application deleted successfully");
      } else {
        // Handle error
        console.error("Failed to delete application");
        // Optionally, set an error state for user feedback
      }
    } catch (error) {
      console.error("Error:", error);
      // Optionally, set an error state for user feedback
    } finally {
      dispatch({ type: "SET_DELETING", payload: false });
    }
  };

  // JSX for date fields based on the number of days selected
  const dateFields =
    state.formData.days === "1" ? (
      <Row className="mb-3">
        <Form.Label column sm="3">
          Date
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="date"
            name="from"
            value={state.formData.from}
            onChange={handleInputChange}
            required
          />
        </Col>
      </Row>
    ) : (
      <>
        <Row className="mb-3">
          <Form.Label column sm="3">
            From Date
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="date"
              name="from"
              value={state.formData.from}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column sm="3">
            To Date
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="date"
              name="to"
              value={state.formData.to}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>
      </>
    );

  return (
    <div className="leave-container">
      {/* Navbar */}
      <div className="navbar">
        <h2>Leave Applications</h2>
        <div className="user">
          <h4>User</h4>
          <img
            src={profile}
            className="img"
            onClick={handleProfileClick}
            alt="profile"
          />
          {state.showLogoutOption && (
            <h5 className="logout-option" onClick={handleLogout}>
              Logout
            </h5>
          )}
        </div>
      </div>

      {/* Button to add new leave application */}
      <div>
        <Button
          className="rounded me-1 p-1 mt-4 Query"
          onClick={handleShowModal}
        >
          <b>+ Add</b>
        </Button>
      </div>

      {/* Modal for adding new leave application */}
      <Modal show={state.showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Dropdown for selecting number of days */}
            <Row className="mb-3">
              <Form.Label column sm="3">
                Days
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  name="days"
                  value={state.formData.days}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="1">1</option>
                  <option value="More than Two">More than Two</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Date fields based on the number of days selected */}
            {dateFields}

            {/* Reason input */}
            <Row className="mb-3">
              <Form.Label column sm="3">
                Reason
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="options"
                  value={state.formData.options}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Close button */}
          <Button
            variant="primary"
            style={{
              backgroundColor: "rgb(65, 65, 230)",
              height: "40px",
              lineHeight: "20px",
              width: "100px",
              marginLeft: "100px",
            }}
            onClick={handleCloseModal}
          >
            Close
          </Button>

          {/* Add button */}
          <Button
            variant="primary"
            style={{
              backgroundColor: "rgb(65, 65, 230)",
              height: "40px",
              lineHeight: "20px",
              width: "100px",
              marginLeft: "10px",
            }}
            onClick={handleAddApplication}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Displaying leave applications in cards */}
      <div className="card-container card-comp">
        {/* Loading or error message */}
        {state.loading ? (
          <p>Loading...</p>
        ) : state.error ? (
          <p>{state.error}</p>
        ) : Array.isArray(state.applications) &&
          state.applications.length > 0 ? (
          // Mapping through the applications and rendering cards
          state.applications.map((app, index) => (
            <Card key={index} className="output-card mt-5">
              <Card.Body>
                <Card.Title>
                  <h3 style={{ color: "rgb(65, 65, 230)" }}>
                    Leave Application {index + 1}
                  </h3>
                </Card.Title>

                {/* Displaying date fields based on the number of days */}
                {app.days === "1" ? (
                  <Card.Text className="mt-4">
                    <strong>Date:</strong> {app.from}
                  </Card.Text>
                ) : (
                  <>
                    <Card.Text className="mt-4">
                      <strong>From:</strong> {app.from}
                    </Card.Text>
                    {app.days !== "1" && (
                      <Card.Text>
                        <strong>To:</strong> {app.to}
                      </Card.Text>
                    )}
                  </>
                )}

                {/* Displaying reason */}
                <Card.Text>
                  <strong>Reason:</strong> {app.options}
                </Card.Text>
              </Card.Body>

              {/* Button to delete the leave application */}
              <Button
                className="del-btn"
                onClick={() => handleDeleteApplication(app._id)}
              >
                Delete
              </Button>
            </Card>
          ))
        ) : (
          <p className="mt-5">No leave applications available.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveApplications;
