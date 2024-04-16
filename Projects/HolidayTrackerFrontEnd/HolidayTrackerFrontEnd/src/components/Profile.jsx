import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Profile() {
  return (
    <div style={{ 
        marginLeft: 'calc(25% + 60px)', 
        marginRight: '10%', 
        marginTop: '50px',
        padding: '2vw' 
      }}>
        <Form>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={3}>
          Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="name" placeholder="Name" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalSurname">
        <Form.Label column sm={3}>
        Surname
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="surname" placeholder="Surname" />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Email
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="email" placeholder="Email" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalManager">
        <Form.Label column sm={3}>
        Manager
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="manager" placeholder="Manager" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalRole">
        <Form.Label column sm={3}>
          Role
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="role" placeholder="Role" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalDepartment">
        <Form.Label column sm={3}>
          Department
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="department" placeholder="Department" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalHollidayAllowance">
        <Form.Label column sm={3}>
        Holliday Allowance
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="hollidayAllowance" placeholder="HollidayAllowance" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalStartDate">
        <Form.Label column sm={3}>
        Start Date
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="startDate" placeholder="Start Date" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalAddress">
        <Form.Label column sm={3}>
        Address
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="address" placeholder="Address" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhoneNumber">
        <Form.Label column sm={3}>
        Phone Number
        </Form.Label>
        <Col sm={8}>
          <Form.Control type="phoneNumber" placeholder="Phone Number" />
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 20, offset: 4 }}>
        <Button  type="button" 
    color="primary" 
    class="btn btn-success btn-lg" 
    style={{ backgroundColor: 'purple', marginTop: '20px' }}>Save Changes</Button> 
        </Col>
      </Form.Group>
    </Form>
    </div>
  );
}

export default Profile;