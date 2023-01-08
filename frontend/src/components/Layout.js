import { Container } from 'reactstrap';

import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column" style={{ gap: 16 }}>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
