// Here you have everything about the login view

import { useState } from "react";
import {
  Input,
  Label,
  Form,
  FormGroup,
  Col,
  Card,
  Row,
  CardTitle,
  NavLink,
} from "reactstrap";
import { useAuthContext } from "../../context/useAuthContext";

const LoginView = () => {
  const { loginUser } = useAuthContext();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <div className="container-fluid my-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card body>
            <CardTitle tag="h5">Login</CardTitle>
            <Form onSubmit={handleSubmit}>
              <hr />
              <FormGroup>
                <Label for="username" sm={2}>
                  Username
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password" sm={2}>
                  Password
                </Label>
                <Col sm={9}>
                  <Input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    placeholder="Enter Password"
                  />
                </Col>
              </FormGroup>
              {/* <button onClick={togglePassword} className='btn btn-secondary'>
              {passwordShown ? "Hide Password" : "Show Password"}
            </button>
            {' '} */}
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              &nbsp;
              <a href="/register" active className="btn btn-info">
                Register
              </a>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginView;
