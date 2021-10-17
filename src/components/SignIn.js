import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const SignUp = () => {
  // const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signIn(
        // usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      history.push("/login");
    } catch {
      setError("Failed to create account");
    }
    setLoading(false);
  };

  return (
    <>
      <Card maxWidth="500px">
        <Card.Body>
          <h1 className="text-center mb-4">Sign Up</h1>
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
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmpasswordRef}
                placeholder="Confirm Password"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              className="d-block w-100 mt-2"
              type="submit"
              disabled={loading}
            >
              Sign up
            </Button>
            <Form.Group className=" mt-2 ">
              <Form.Text className="text-muted w-100 ">
                Already have an account try?{" "}
                <Link to="login" className="ms-2">
                  Login
                </Link>
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SignUp;
