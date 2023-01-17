import { Container } from "reactstrap";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <div
        className="flex-grow-1 py-2"
        style={{ overflow: "auto", backgroundColor: "#f2f2f2" }}
      >
        <Container style={{ flex: 1 }}>{children}</Container>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
