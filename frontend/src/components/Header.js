import { Row, Col } from "reactstrap";
const Header = () => {
  return (
    <Row className="d-flex py-2">
      <Col xs={6}>
        <div style={{ fontWeight: 600, color: "#013b28" }}>ShopMac</div>
      </Col>
      <Col xs={6} className="d-flex justify-content-end" style={{ gap: 25 }}>
        <div className="d-flex align-items-center" style={{ gap: 5 }}>
          <img src="/cart.png" />
          <div style={{ fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Cart
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
