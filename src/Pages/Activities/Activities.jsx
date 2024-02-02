/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Activities = ({ showFullContent }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const [frontendUrl, setFrontendUrl] = useState("");
  const [backendUrl, setBackendUrl] = useState("");
  const [comments, setComments] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch request for creating a new task
      const response = await fetch(
        "https://zen-class-lxyk.onrender.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            frontendUrl,
            backendUrl,
            comments,
          }),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Task created successfully");

        // Clear the form
        setFrontendUrl("");
        setBackendUrl("");
        setComments("");
        navigate("/task");
      } else {
        // Handle error, e.g., show an error message
        console.error("Task creation failed");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      // Handle other errors as needed
    }
  };
  return (
    <div id="Activities">
      <h2>Activities</h2>
      <div
        className="task"
        style={{ height: showFullContent ? "auto" : "100px" }}
      >
        <p>
          https://docs.google.com/document/d/1lkzy8u0rkW5v2jGvbJcJrmVVLjMqN_TmmsHkL41AoIc/preview
        </p>
        {!showFullContent && (
          <div id="badge" className="text-end">
            <Badge bg="primary">Task</Badge>
          </div>
        )}
        {showFullContent && (
          <>
            <div id="badge" className="text-end">
              <Badge bg="primary">Task</Badge>
            </div>

            <Form className="form" onSubmit={handleFormSubmit}>
              <Form.Group controlId="frontendUrl">
                <Form.Label>Frontend Source code URL:</Form.Label>
                <Form.Control type="url" placeholder="Enter the frontend URL" />
              </Form.Group>

              <Form.Group controlId="backendUrl">
                <Form.Label>Backend Source code URL:</Form.Label>
                <Form.Control type="url" placeholder="Enter the backend URL" />
              </Form.Group>

              <Form.Group controlId="comments">
                <Form.Label>Comments:</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave the comments here"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Activities;
