import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

import useAppContext from "../hooks/useAppContext";
import { getInfo } from "../services/auth.service";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user, setUser } = useAppContext();

  const checkUser = async () => {
    try {
      const res = await getInfo();
      const { userId } = res.data || {};
      setUser({ userId });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="sticky-top" style={{ backgroundColor: "#ffd500" }}>
      <Container>
        <Row className="d-flex py-2">
          <Col xs={6}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 32,
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <img
                src="/shopmacs.png"
                alt="logo"
                style={{ width: 50, height: 50 }}
              />
            </div>
          </Col>
          <Col
            xs={6}
            className="d-flex justify-content-end"
            style={{ gap: 25 }}
          >
            <div className="d-flex align-items-center" style={{ gap: 5 }}>
              <img
                src={!user ? "/account.png" : "/history.png"}
                width="24px"
                height="24px"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  !user ? navigate("/login") : navigate("/history")
                }
              />
            </div>
            <div className="d-flex align-items-center" style={{ gap: 5 }}>
              <img
                src="/cart.png"
                width="24px"
                height="24px"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              />
            </div>
            {user ? (
              <div className="d-flex align-items-center" style={{ gap: 5 }}>
                <img
                  src="/logout.png"
                  width="24px"
                  height="24px"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/");
                    setUser(null);
                    localStorage.removeItem("accessToken");
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
