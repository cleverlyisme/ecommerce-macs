import { Row, Col } from 'reactstrap';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Navs from './Navs';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <div
        className="flex-grow-1"
        style={{ overflow: 'auto', backgroundColor: '#f2f2f2' }}
      >
        <div style={{ padding: '0 16px' }}>
          <Row>
            <Col xs={12} sm={2}>
              <Navs />
            </Col>
            <Col xs={12} sm={10}>
              {children}
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
