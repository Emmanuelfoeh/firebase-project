import { Alert } from "bootstrap";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await logOut();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary mt-3 w-100">
            Update Profile
          </Link>
        </Card.Body>
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </Card>
    </>
  );
};

export default Dashboard;
