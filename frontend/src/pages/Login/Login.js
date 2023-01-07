import { Container, Row, Col, Input, Button } from "reactstrap";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        width: "40vw",
        height: "100vh",
        borderRadius: 4,
      }}
    >
      <div
        className="d-flex flex-column p-3"
        style={{
          border: "1px solid gray",
          borderRadius: 6,
          gap: 25,
          width: "100%",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 600 }}>Login</div>

        <div className="d-flex flex-column" style={{ gap: 10 }}>
          <div className="d-flex flex-column w-100" style={{ gap: 5 }}>
            <div style={{ fontSize: 14 }}>Email</div>
            <Input
              className="w-100"
              placeholder="Enter your email..."
              style={{ height: "80%", opacity: 0.7, fontSize: 12 }}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className="d-flex flex-column w-100" style={{ gap: 5 }}>
            <div style={{ fontSize: 14 }}>Password</div>
            <Input
              placeholder="Enter your password..."
              type="password"
              style={{ height: "80%", opacity: 0.7, fontSize: 12 }}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
        </div>

        <div className="d-flex flex-column" style={{ gap: 5 }}>
          <Button className="w-100" color="primary" size="sm">
            Sign In
          </Button>
          <div className="d-flex justify-content-center" style={{ gap: 5 }}>
            <div style={{ fontSize: 12 }}>Don't have an account?</div>
            <div style={{ cursor: "pointer", fontSize: 12, color: "#598dd8" }}>
              Sign up
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
