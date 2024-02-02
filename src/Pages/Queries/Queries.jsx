// frontend/src/components/Queries.js
import { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { useFormik } from "formik";
import profile from "../../assets/profile.jpg";
import "./Queries.css";
import { useNavigate } from "react-router-dom";
import { useQueries } from "./queriesContext";

const Queries = () => {
  // Using custom hook to get queries state and methods
  const {
    queries,
    handleCreateQuery: createQuery,
    handleDeleteQuery,
    loading,
    error,
  } = useQueries();

  // Navigation hook for redirecting
  const navigate = useNavigate();

  // State for logout option visibility and modal visibility
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Function to handle user logout
  const handleLogout = () => {
    navigate("/");
  };

  // Function to handle profile click and toggle logout option visibility
  const handleProfileClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  // Function to show create query modal
  const handleCreateQuery = () => {
    setShowModal(true);
  };

  // Function to close the modal and reset the form
  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

  // Function to handle back button in the modal
  const handleBack = () => {
    setShowModal(false);
    formik.resetForm();
  };

  // Using formik for form handling
  const formik = useFormik({
    initialValues: {
      category: "",
      language: "",
      title: "",
      description: "",
      from: "",
      to: "",
    },
    onSubmit: (values) => {
      createQuery(values);
      handleCloseModal();
    },
    validate: (values) => {
      const errors = {};

      // Validation checks for each form field
      if (!values.category) {
        errors.category = "Required";
      }

      if (!values.language) {
        errors.language = "Required";
      }

      if (!values.title) {
        errors.title = "Required";
      }

      if (!values.description) {
        errors.description = "Required";
      }

      if (!values.from) {
        errors.from = "Required";
      }

      if (!values.to) {
        errors.to = "Required";
      }

      return errors;
    },
  });

  return (
    <div className="queries-container">
      {/* Navbar */}
      <div className="navbar">
        <h2>Queries</h2>
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

      {/* Button to create a new query */}
      <div>
        <button
          className="rounded me-2 p-1 mt-2 Query"
          onClick={handleCreateQuery}
        >
          <b>+ Create Query</b>
        </button>

        {/* Modal for creating a new query */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Create Query</Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center">
            {/* Back button */}
            <div className="text-center">
              <Button
                variant="primary"
                style={{
                  backgroundColor: "rgb(65, 65, 230)",
                  height: "40px",
                  lineHeight: "20px",
                  width: "100px",
                }}
                onClick={handleBack}
              >
                Back
              </Button>
            </div>

            {/* Form for creating a new query */}
            <Form
              className="d-inline-block text-start"
              onSubmit={formik.handleSubmit}
            >
              {/* Category dropdown */}
              <div className="mb-4">
                <Form.Label>Category</Form.Label>
                <select
                  className={`form-select ${
                    formik.touched.category && formik.errors.category
                      ? "is-invalid"
                      : ""
                  }`}
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">---- Select Category ----</option>
                  <option value="Zen Class">Zen Class</option>
                  <option value="Placement related">Placement related</option>
                  <option value="Coordination related">
                    Coordination related
                  </option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="invalid-feedback">
                    {formik.errors.category}
                  </div>
                )}
              </div>

              {/* Language dropdown */}
              <div className="mb-5">
                <Form.Label>Preferred Voice Communication Language</Form.Label>
                <select
                  className={`form-select ${
                    formik.touched.language && formik.errors.language
                      ? "is-invalid"
                      : ""
                  }`}
                  name="language"
                  value={formik.values.language}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">---- Select Language ----</option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
                {formik.touched.language && formik.errors.language && (
                  <div className="invalid-feedback">
                    {formik.errors.language}
                  </div>
                )}
              </div>

              {/* Query Title input */}
              <div className="mb-4">
                <Form.Label>Query Title</Form.Label>
                <input
                  type="text"
                  placeholder="Enter Query Title"
                  className={`form-control ${
                    formik.touched.title && formik.errors.title
                      ? "is-invalid"
                      : ""
                  }`}
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="invalid-feedback">{formik.errors.title}</div>
                )}
              </div>

              {/* Query Description textarea */}
              <div className="mb-5">
                <Form.Label>Query Description</Form.Label>
                <textarea
                  placeholder="Enter Query Description"
                  className={`form-control ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              {/* Availability time input */}
              <Modal.Title className="mb-4">Your Availability time</Modal.Title>
              <Form.Group className="mb-3">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="time"
                  name="from"
                  value={formik.values.from}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.from && formik.errors.from
                      ? "is-invalid"
                      : ""
                  }
                />
                {formik.touched.from && formik.errors.from && (
                  <div className="invalid-feedback">{formik.errors.from}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="time"
                  name="to"
                  value={formik.values.to}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.to && formik.errors.to ? "is-invalid" : ""
                  }
                />
                {formik.touched.to && formik.errors.to && (
                  <div className="invalid-feedback">{formik.errors.to}</div>
                )}
              </Form.Group>

              {/* Submit button */}
              <div className="text-center mb-3">
                <Button
                  type="submit"
                  variant="primary"
                  style={{
                    backgroundColor: "rgb(65, 65, 230)",
                    height: "40px",
                    lineHeight: "20px",
                  }}
                >
                  Create
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Displaying created queries in cards */}
      <div className="output-card-container">
        {/* Loading or error message */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : queries.length > 0 ? (
          // Mapping through the queries and rendering cards
          queries.map((query, index) => (
            <div key={index} className="output-card-wrapper">
              <Card className="output-card">
                <Card.Body>
                  <Card.Title>
                    <h3 style={{ color: "rgb(65, 65, 230)" }}>
                      Query Title: {query.title}
                    </h3>
                  </Card.Title>
                  <Card.Text>Category: {query.category}</Card.Text>
                  <Card.Text>Created: {query.createdDateTime}</Card.Text>
                </Card.Body>

                {/* Button to delete the query */}
                <Button
                  className="del-btn"
                  onClick={() => handleDeleteQuery(query._id)}
                >
                  Delete
                </Button>
              </Card>
            </div>
          ))
        ) : (
          <p>No queries available.</p>
        )}
      </div>
    </div>
  );
};

export default Queries;
