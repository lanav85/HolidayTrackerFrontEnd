import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "img/logo.png";
import background from "img/background.png";

function Login() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Form
        style={{
          fontSize: "16px",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          style={{
            padding: "40px",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              display: "block",
              margin: "0 auto",
              width: "100px",
              height: "auto",
            }}
          />
          <h1 style={{ fontWeight: "bold" }}>Holiday Tracker</h1>
        </div>

        <div
          style={{
            padding: "20px",
          }}
        >
          <h3> Login to Holiday Tracker</h3>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            type="submit"
            color="primary"
            className="btn btn-success btn-lg"
            style={{
              backgroundColor: "purple",
              padding: "10px 50px",
              height: "auto",
            }}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
