import { Container } from 'reactstrap';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ gap: 16 }}>
      <Header />
      <div className="flex-grow-1" style={{ overflow: 'auto' }}>
        <Container style={{ flex: 1 }}>{children}</Container>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
