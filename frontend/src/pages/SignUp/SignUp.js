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
    }
  };

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
          <div style={{ fontSize: 24, fontWeight: 600 }}>Đăng kí</div>
          <div style={{ fontSize: 12 }}>
            Tạo tài khoản! Hãy nhập thông tin của bạn
          </div>
        </div>

        <div className="d-flex flex-column" style={{ gap: 10 }}>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>Email</div>
            <input
              type="number"
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
      </div>
    </div>
  );
};

export default SignUp;
