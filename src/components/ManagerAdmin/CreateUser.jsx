import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import * as api from "../../api/ApiRequests";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import userpool from "../../userpool";
import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

function CreateUser() {
  const [roleName, setRoleName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]); // for storing list of departments
  const roles = [
    { roleid: 1, roledescription: "Manager" },
    { roleid: 2, roledescription: "Supervisor" },
    { roleid: 3, roledescription: "Employee" },
  ];

  useEffect(() => {
    api.getAllDepartments((data) => {
      setDepartments(data);
    });
  });

  function handleSave(event) {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let departmentID = departments.find(
      (e) => e.departmentName === event.target.department.value
    ).departmentID;
    let roleID = roles.find(
      (e) => e.roledescription === event.target.role.value
    ).roleid;

    let user = {
      data: '{"name": "' + name + '"}',
      departmentID: departmentID,
      email: email,
      userID: 0,
      roleID: roleID,
      holidayEntitlement: 23,
    };

    api.createUser(
      user,
      (res) => {
        if (res === "User created/updated successfully.") {
          console.log("User created successfully in database");
          sendInvitationLink(email, generatePassword(), (error) => {
            console.log(
              "There was an issue creating the user in AWS Cognito, for data cleanliness the new user will be deleted from the db..."
            );
            api.getUsersByDepartmentId(departmentID, (users) => {
              let user = users.find((u) => u.email === email);
              api.deleteUser(user.userID, () => {
                console.log(
                  "...new user was cleaned from the db successfully."
                );
              });
            });
            alert(
              "Error creating user, so user will not be created. Please ensure email is available on Cognito: " +
                error
            );
          });
        } else {
          console.log("Unexpected create user response from api");
        }
      },
      (error) => {
        alert(
          "Error creating user in database. Please ensure user/email does not already exist, and that the role & department assigned exists and is available: " +
            error.status +
            " " +
            error.statusText
        );
      }
    );
  }

  const generatePassword = () => {
    let charset =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newPassword = "";

    for (let i = 0; i < 8; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return newPassword;
  };

  const sendInvitationLink = (email, password, onError) => {
    const params = {
      UserPoolId: import.meta.env.VITE_REACT_APP_USER_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      DesiredDeliveryMediums: ["EMAIL"],
      ForceAliasCreation: false,
      TemporaryPassword: password,
    };

    let client = new CognitoIdentityProviderClient({
      region: import.meta.env.VITE_REACT_APP_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_REACT_AWS_IAM_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_REACT_AWS_IAM_SECRET_KEY,
      },
    });

    let createUserCommand = new AdminCreateUserCommand(params);

    try {
      client
        .send(createUserCommand)
        .then((r) => {
          const setPasswordParams = {
            UserPoolId: import.meta.env.VITE_REACT_APP_USER_POOL_ID,
            Username: email,
            Password: password,
            Permanent: true,
          };
          let setUserPasswordCommand = new AdminSetUserPasswordCommand(
            setPasswordParams
          );
          client
            .send(setUserPasswordCommand)
            .then((r) => {
              alert(
                "User " +
                  email +
                  " has been registered with temporary password: " +
                  password
              );
            })
            .catch((error) => {
              console.log("Cognito Password Set: " + error.message);
              onError(error.message);
            });
        })
        .catch((error) => {
          console.log("Cognito: " + error.message);
          onError(error.message);
        });
    } catch (error) {
      console.log("Error inviting user:", error);
      onError(error.message);
    }
  };

  const signUpToAws = (email, password) => {
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    userpool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        alert("User Added Successfully");
        Navigate("/dashboard");
      }
    });
  };

  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "3.125rem", padding: "1.25rem" }}>
        <h2
          style={{
            marginBottom: "1.5625rem",
            textAlign: "center",
          }}
        >
          Register New User
        </h2>
        <div className="shadow p-5 bg-white rounded">
          <Form onSubmit={handleSave}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalName"
              style={{ marginTop: "3.125rem" }}
            >
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalRole"
            >
              <Form.Label column sm={3}>
                Role
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  value={roleName}
                  name="role"
                  onChange={(e) => setRoleName(e.target.value)} // dropdown menu
                >
                  {roles.map((role) => (
                    <option key={role.roleid} value={role.roledescription}>
                      {role.roledescription}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalDepartment"
            >
              <Form.Label column sm={3}>
                Department
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  value={departmentName}
                  name="department"
                  onChange={(e) => setDepartmentName(e.target.value)} // dropdown menu
                >
                  {departments.map((department) => (
                    <option
                      key={department.departmentID}
                      value={department.departmentName}
                    >
                      {department.departmentName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 3 }}>
                <Button
                  style={{ marginTop: "1.875rem" }}
                  type="submit"
                  className="btn btn-success btn-lg submit-button"
                >
                  Add User
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
