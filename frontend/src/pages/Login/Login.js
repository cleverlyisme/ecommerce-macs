import { Container, Row, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth.service";
import useAdminContext from "../../hooks/useAdminContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <div style={{ fontSize: 24, fontWeight: 600 }}>Log in</div>
          <div style={{ fontSize: 12 }}>
            Welcome back! please enter your detail.
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
              aria-describedby="basic-addon1"
              style={{ height: 35 }}
            ></input>
          </div>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>Password</div>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ height: 35 }}
            ></input>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Button
            size="sm"
            style={{ backgroundColor: "#3438cd", cursor: "pointer" }}
          >
            Sign In
          </Button>
        </div>

        <div className="d-flex justify-content-center" style={{ gap: 3 }}>
          <div style={{ fontSize: 12 }}>Don't have an account?</div>
          <div style={{ fontSize: 12, cursor: "pointer", color: "#3438cd" }}>
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
