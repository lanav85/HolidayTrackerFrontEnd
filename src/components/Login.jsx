import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "img/logo.png";
import background from "img/background.png";
import "css/Login.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authenticate";

const Login = () => {
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loginErr, setLoginErr] = useState("");

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
        setEmailErr("Email is Required");
        setPasswordErr("Password is required");
        resolve({
          email: "Email is Required",
          password: "Password is required",
        });
      } else if (email === "") {
        setEmailErr("Email is Required");
        resolve({ email: "Email is Required", password: "" });
      } else if (password === "") {
        setPasswordErr("Password is required");
        resolve({ email: "", password: "Password is required" });
      } else if (password.length < 6) {
        setPasswordErr("must be 6 character");
        resolve({ email: "", password: "must be 6 character" });
      } else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then(
        (res) => {
          if (res.email === "" && res.password === "") {
            authenticate(email, password)
              .then(
                (data) => {
                  setLoginErr("");
                  Navigate("/dashboard");
                },
                (err) => {
                  console.log(err);
                  setLoginErr(err.message);
                }
              )
              .catch((err) => console.log(err));
          }
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err));
  };

  /*const handleClear = () => {
  setUsername("");
  setPassword("");
};

function Login() {
  function executeLogin() {
    //TODO Implement login API logic here. For now, hardcode user response data we will get from the endpoint:
    let user_data = {
      data: '{"age": 28, "name": "Jane Smith"}',
      holidayEntitlement: 20,
      departmentID: 2,
      email: "jane.smith@example.com",
      roleID: 2,
      userID: 11,
    };
    localStorage.setItem("holiday-tracker-user", JSON.stringify(user_data));

    //Now you can get this data ANYWHERE in your app using localStorage, e.g.
    let user_string = localStorage.getItem("holiday-tracker-user");
    let user_json = JSON.parse(user_string);
    let userData = JSON.parse(user_json.data);
    alert("Hello " + userData.name + "! Your user ID is " + user_json.userID);

    //And whenever you want to logout the user in future, you would use this code to clear the data: localStorage.removeItem("holiday-tracker-user");

    //localStorage is very easy way to store data in the browser, you can store any string.
    //You need to supply a key e.g. "holiday-tracker-user"
    //               and a string value (note i don't think number, json etc. works)
    //Thats why you see when i store the user json data, i turn it into a string.
    // and then when i retrieve it, i turn the string back into json.
  }
*/
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Form className="form">
        <div className="section">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Holiday Tracker</h1>
        </div>

        <div className="section">
          <h3> Login to Holiday Tracker</h3>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <div className="section">
          <Link to="/dashboard">
            <Button
              type="submit"
              className="btn btn-success btn-lg btn-login"
              onClick={() => executeLogin()}
            >
              Login
            </Button>
            <button
              type="button"
              onClick={handleClear}
              style={{ marginRight: "10px" }}
            >
              Clear
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
