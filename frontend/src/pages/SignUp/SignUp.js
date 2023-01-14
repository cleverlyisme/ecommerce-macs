import { Container, Row, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#e8e8f2" }}
    >
      <div
        className="d-flex flex-column py-4 px-5"
        style={{
          width: "40vw",
          backgroundColor: "white",
          borderRadius: 6,
          gap: 15,
        }}
      >
        <div>
          <img src="/shopmacs.png" style={{ width: 40, height: 40 }} />
        </div>

        <div>
          <div style={{ fontSize: 24, fontWeight: 600 }}>Sign up</div>
          <div style={{ fontSize: 12 }}>
            Create an account! please enter your detail
          </div>
        </div>

        <div className="d-flex flex-column" style={{ gap: 10 }}>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>
              Email or your phone
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Email or your phone"
              aria-label="Username"
              value={email}
              aria-describedby="basic-addon1"
              style={{ height: 35, fontSize: 12 }}
              onClick={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>Password</div>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              aria-label="Username"
              value={password}
              aria-describedby="basic-addon1"
              style={{ height: 35, fontSize: 12 }}
              onClick={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>
              Confirm password
            </div>
            <input
              type="password"
              class="form-control"
              placeholder="Confirm password"
              aria-label="Username"
              value={confirmPassword}
              aria-describedby="basic-addon1"
              style={{ height: 35, fontSize: 12 }}
              onClick={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Button
            size="sm"
            style={{
              backgroundColor: "#3438cd",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
