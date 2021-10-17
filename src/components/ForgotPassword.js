import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ForgotPassword = () => {
  // const usernameRef = useRef();
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { forgetpassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await forgetpassword(emailRef.current.value);
      setMessage("Check your email inside for further instruction");
    } catch {
      setError("Reset failed");
    }
    setLoading(false);
  };

  return (
    <>
      <Card maxWidth="500px">
        <Card.Body>
          <h1 className="text-center bg-highlight mb-4">Reset Password</h1>
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>Enter email to reset password</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              className="d-block w-100 mt-2"
              type="submit"
              disabled={loading}
            >
              Send link
            </Button>
            <Form.Group className=" mt-2   w-100 ">
              <Form.Text className="text-muted w-100 ">
                Back to login
                <Link to="/login" className=" ms-2">
                  Log In
                </Link>
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ForgotPassword;
