// src/pages/Signup/Signup.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import zen from "../../assets/zen.jpg";
import zenbg from "../../assets/zenbg.jpg";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleClick = () => {
    navigate("/");
  };

  const handleSignup = async (values) => {
    try {
      // Make a POST request to the signup endpoint
      const response = await fetch(
        "https://zen-class-lxyk.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      // Check if the request was successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        // Redirect upon successful signup
        navigate("/");
      } else if (response.status === 400) {
        // parse the error data and set the error message
        const data = await response.json();
        setMessage(data.message);
      } else {
        // If the request was not successful, set a generic error message
        setMessage("Signup failed!");
      }
    } catch (error) {
      // Handle any errors that occur during the signup process
      console.error("Error:", error);
      setMessage("Error occurred during signup");
    }
  };

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={zen} className="zen-image" alt="Zen" />
      </div>
      <div className="form-container">
        {message && <div className="message">{message}</div>}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("! Please enter the Email"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("! Please enter the Password"),
          })}
          onSubmit={(values) => {
            // Call the handleSignup function when the form is submitted
            handleSignup(values);
          }}
        >
          <Form>
            {/* Email input field */}
            <label>Email</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            {/* Password input field */}
            <label>Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            {/* Signup button */}
            <button className="btn-login" type="submit">
              Signup
            </button>

            {/* Login link */}
            <div className="Login">
              Already have an account? <h6 onClick={handleClick}>Login</h6>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="zenbg">
        <img src={zenbg} className="zen-image1" alt="Zenbg" />
      </div>
    </div>
  );
};

export default Signup;
