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
} from "reactstrap";
import { useAuthContext } from "../../context/useAuthContext";

const RegisterView = () => {
  const { registerUser } = useAuthContext();

  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    is_admin_user: false,
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = formData.username;
    const password = formData.password;
    const password2 = formData.password2;

    console.log(username, password, password2);

    username.length > 0 && registerUser(username, password, password2);
  };

  return (
    <div className="container-fluid my-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card body>
            <CardTitle tag="h5">Register</CardTitle>
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
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
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
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password2" sm={2}>
                  Confirm Password
                </Label>
                <Col sm={9}>
                  <Input
                    type={passwordShown ? "text" : "password"}
                    id="password2"
                    name="password2"
                    placeholder="Confirm Password"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="is_admin_user"
                    checked={formData.is_admin_user}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_admin_user: e.target.checked,
                      })
                    }
                  />{" "}
                  Is Admin User
                </Label>
              </FormGroup>
              <button onClick={togglePassword} className="btn btn-secondary">
                {passwordShown ? "Hide Password" : "Show Password"}
              </button>{" "}
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterView;
