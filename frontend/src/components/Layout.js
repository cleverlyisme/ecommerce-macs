import { useEffect } from "react";
import { Container } from "reactstrap";

import Header from "./Header";
import Footer from "./Footer";
import useAppContext from "../hooks/useAppContext";
import { getInfo } from "../services/auth.service";

const Layout = ({ children }) => {
  const { setUser } = useAppContext();

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
