/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import zen from "../../assets/zen.jpg";
import zenbg from "../../assets/zenbg.jpg";
import "./login.css";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  // Redirect to signup page
  const handleSignInClick = () => {
    navigate("/signup");
  };

  // Handle the login process
  const handleLogin = async (values) => {
    try {
      // Make a POST request to the login endpoint
      const response = await fetch(
        "https://zen-class-lxyk.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // Pass form values directly to fetch
        }
      );
      const responseData = await response.json();

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Store the authentication token in local storage
        localStorage.setItem("authToken", responseData.token);
        setMessage(responseData.message);
        // Redirect upon successful login
        navigate("/Home");
      } else if (response.status === 401) {
        setMessage(responseData.message);
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error("Error:", error);
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
              .required("! Please Enter the Email"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("! Please Enter the Password"),
          })}
          onSubmit={(values) => {
            // Call the handleLogin function when the form is submitted
            handleLogin(values);
          }}
        >
          <Form>
            {/* Email input field */}
            <label>Email</label>
            <Field type="email" name="email" placeholder="example@gmail.com" />
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
              placeholder="Your Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            {/* Login button */}
            <button type="submit" className="btn-login">
              Login
            </button>

            {/* Signup link */}
            <div className="SignUp">
              Don't Have Account? <h6 onClick={handleSignInClick}>SignUp</h6>
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

export default Login;
