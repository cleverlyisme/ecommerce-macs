import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import { getProductById } from "../../services/products.service";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
  // console.log(product);
  const { _id, name, images, description, price, quantity } = product || {};
  console.log({ _id, name, images, description, price, quantity });
  if (!product) return null;
  return (
    <Container className="d-flex flex-column" style={{ gap: 20 }}>
      <Header />
      <Row className="d-flex">
        <Col xs={12} sm={12} md={6}>
          <img src={images[0]} style={{ maxWidth: "100%" }} />
        </Col>
        <Col xs={6} className="d-flex flex-column" style={{ gap: 20 }}>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: 10, opacity: 0.7 }}>{description}</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{price}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
