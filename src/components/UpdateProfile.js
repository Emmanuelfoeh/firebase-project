import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const UpdateProfile = () => {
  // const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser, updatePassword, updateEmail } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card maxWidth="500px">
        <Card.Body>
          <h1 className="text-center mb-4">Update Profile</h1>
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
                defaultValue={currentUser.email}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              id="password"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="change Password or leave same"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              id="password"
              controlId="confirmPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmpasswordRef}
                placeholder="Confirm Password or leave same"
              />
            </Form.Group>

            <Button
              variant="primary"
              className="d-block w-100 mt-2"
              type="submit"
              disabled={loading}
            >
              Update profile
            </Button>
            <Form.Group className=" mt-2 ">
              <Form.Text className="text-muted w-100 ">
                <Link to="/" className="ms-2">
                  Cancel
                </Link>
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UpdateProfile;
