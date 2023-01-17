import { Container, Row, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth.service";
import useAppContext from "../../hooks/useAppContext";
import { getUserHistory } from "../../services/user.service";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleClickLogin = async () => {
    try {
      const res =
        isNaN(emailOrPhone) == true
          ? await login({ email: emailOrPhone, password })
          : await login({ phone: emailOrPhone, password });
      const { token, user } = res.data;
      localStorage.setItem("accessToken", token);
      setUser(user);
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
          <div style={{ fontSize: 24, fontWeight: 600 }}>Đăng nhập</div>
          <div style={{ fontSize: 12 }}>
            Xin chào! Hãy nhập thông tin của bạn
          </div>
        </div>

        <div className="d-flex flex-column" style={{ gap: 10 }}>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 12, fontWeight: 550 }}>
              Email hoặc số điện thoại
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Email hoặc số điện thoại"
              aria-label="Username"
              value={emailOrPhone}
              aria-describedby="basic-addon1"
              style={{ height: 35, fontSize: 12 }}
              onChange={(e) => setEmailOrPhone(e.target.value)}
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
            onClick={handleClickLogin}
          >
            Đăng nhập
          </Button>
        </div>

        <div className="d-flex justify-content-center" style={{ gap: 3 }}>
          <div style={{ fontSize: 12 }}>Không có tài khoản?</div>
          <div
            style={{ fontSize: 12, cursor: "pointer", color: "#3438cd" }}
            onClick={() => navigate("/signup")}
          >
            Đăng kí
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
