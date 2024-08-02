import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import logo from "img/logo.png";
import background from "img/background.png";
import "css/Login.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authenticate";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import userpool from "../userpool";
import * as api from "../api/ApiRequests";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === "" && password === "") {
        alert("Email is Required");
        alert("Password is required");
        resolve({
          email: "Email is Required",
          password: "Password is required",
        });
      } else if (email === "") {
        alert("Email is Required");
        resolve({ email: "Email is Required", password: "" });
      } else if (password === "") {
        alert("Password is required");
        resolve({ email: "", password: "Password is required" });
      } else if (password.length < 6) {
        alert("Password must be at least 6 character");
        resolve({ email: "", password: "must be 6 character" });
      } else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleLoginClicked = (event) => {
    event.preventDefault();
    validation()
      .then(
        (res) => {
          if (res.email === "" && res.password === "") {
            let loginRequest = {
              email: email,
              password: password,
            };
            api.login(
              loginRequest,
              (data) => {
                if (data) {
                  localStorage.setItem(
                    "holiday-tracker-user",
                    JSON.stringify(data)
                  );
                  navigate("/dashboard");
                } else {
                  alert("error logging in!");
                }
              },
              (err) => {
                alert(JSON.stringify(err));
              }
            );
          }
        },
        (err) => alert(err)
      )
      .catch((err) => alert(err));
  };

  const toggleCredentials = () => {
    //toggleCredentials is a function that toggles the value of showCredentials.
    // When called, it changes showCredentials from false to true or from true to false.
    setShowCredentials(!showCredentials); //showCredentials is initialized with false, meaning the card is hidden by default.
  };

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Form onSubmit={handleLoginClicked} className="form">
        <div className="section">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Holiday Tracker</h1>
        </div>

        <div className="section">
          <h3> Login to Holiday Tracker</h3>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => {
              formInputChange("email", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              formInputChange("password", e.target.value);
            }}
          />
        </Form.Group>

        <div className="section">
          <Button
            type="submit"
            className="btn btn-success btn-lg btn-login"
            style={{ marginRight: "20px" }}
          >
            Login
          </Button>

          <button
            type="button"
            onClick={toggleCredentials}
            className="btn btn-info btn-lg"
          >
            Sample login credentials
          </button>
        </div>
      </Form>

      {/* Conditionally render the credentials card . && operator is used for conditional rendering.*/}
      {/* showCredentials is the condition. If it is true, the content after && will be rendered*/}
      {showCredentials && (
        <Card style={{ marginLeft: "60px" }}>
          <Card.Body>
            <Card.Title>Login Credentials</Card.Title>
            <Card.Text>
              <strong>Supervisor</strong>
              <br />
              holidaytrackerproject1@gmail.com
              <br />
              Password: hgzRGIal
              <br />
              <br />
              <strong>Manager</strong>
              <br />
              holidaytrackerproject2@gmail.com
              <br />
              Password: tIDkBTst
              <br />
              <br />
              <strong>Employee</strong>
              <br />
              jcolladocabeza@gmail.com
              <br />
              Password: GIWDWG3y
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Login;
