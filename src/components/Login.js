import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  // const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { logIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(
        // usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      history.push("/");
    } catch {
      setError("Please Login failed");
    }
    setLoading(false);
  };

  return (
    <>
      <Card maxWidth="500px">
        <Card.Body>
          <h1 className="text-center mb-4">Log In</h1>
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3" id="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                ref={usernameRef}
                placeholder="Enter User name"
                required
              />
            </Form.Group> */}

            <Form.Group className="mb-3" id="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              className="d-block w-100 mt-2"
              type="submit"
              disabled={loading}
            >
              Log In
            </Button>
            <div className="w-100 mt-3">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
            <Form.Group className=" mt-2   w-100 ">
              <Form.Text className="text-muted w-100 ">
                Do not have an account ?
                <Link to="signup" className=" ms-2">
                  Sign Up
                </Link>
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
