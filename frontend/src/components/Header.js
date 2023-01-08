import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1d1d1f' }}>
      <Container>
        <Row className="d-flex py-2">
          <Col xs={6}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 32,
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              ShopMac
            </div>
          </Col>
          <Col
            xs={6}
            className="d-flex justify-content-end"
            style={{ gap: 25 }}
          >
            <div className="d-flex align-items-center" style={{ gap: 5 }}>
              <img
                src="/cart.png"
                width="24px"
                height="24px"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/cart')}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
