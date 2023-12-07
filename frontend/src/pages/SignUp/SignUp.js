import { Container, Row, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { register } from "../../services/auth.service";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleClickRegister = async () => {
    try {
      const res = await register({
        email,
        password,
        phone,
      });
      if (res.data == "Registered successfully") {
        NotificationManager.success("Create an account successfully");
        navigate("/login");
      } else {
        NotificationManager.warning("Failed to create an account");
      }
    } catch (err) {
      console.log(err.message);
      NotificationManager.warning(
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#e8e8f2",
      }}
    >
      <Col
        className="d-flex flex-column py-4 px-5"
        xs={9}
        sm={7}
        lg={4}
        style={{
          backgroundColor: "white",
          borderRadius: 6,
          gap: 15,
        }}
      >
        <div className="d-flex justify-content-center">
          <img src="/shopmacs.png" style={{ width: 40, height: 40 }} />
        </div>

        <div>
          <div style={{ fontSize: 24, fontWeight: 600 }}>Đăng kí</div>
          <div style={{ fontSize: 12 }}>
            Tạo tài khoản! Hãy nhập thông tin của bạn
          </div>
        </div>

        <div className="d-flex flex-column" style={{ gap: 10 }}>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>Email</div>
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              aria-label="Username"
              value={email}
              aria-describedby="basic-addon1"
              style={{ height: 35, fontSize: 12 }}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>Số điện thoại</div>
            <input
              type="number"
              class="form-control"
              placeholder="Số điện thoại"
              aria-label="Username"
              value={phone}
              aria-describedby="basic-addon1"
              style={{ height: 35, fontSize: 12 }}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>Mật khẩu</div>
            <input
              type="password"
              class="form-control"
              placeholder="Mật khẩu"
              aria-label="Username"
              value={password}
              aria-describedby="basic-addon1"
              style={{ height: 35, fontSize: 12 }}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleClickRegister}
          >
            Đăng kí
          </Button>
        </div>

        <div className="d-flex justify-content-center" style={{ gap: 3 }}>
          <div style={{ fontSize: 12 }}>Đã có tài khoản?</div>
          <div
            style={{ fontSize: 12, cursor: "pointer", color: "#3438cd" }}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default SignUp;
