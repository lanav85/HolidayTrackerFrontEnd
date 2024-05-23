import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function CreateUser() {
  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "50px", padding: "2vw" }}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="Enter name" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="email" placeholder="Enter email" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalRole">
            <Form.Label column sm={3}>
              Role
            </Form.Label>
            <Col sm={8}>
              <Form.Select required>
                <option value="">Select role</option>
                {/* Populate role options statically or dynamically */}
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
              <Form.Select required>
                <option value="">Select department</option>
                {/* Populate department options statically or dynamically */}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 3 }}>
              <Button
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
  );
}

export default CreateUser;
