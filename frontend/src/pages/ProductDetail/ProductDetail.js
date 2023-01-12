import { Container, Row, Col, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { getProductById } from "../../services/products.service";
import Currency from "../../utils/formatCurrency";
import useAppContext from "../../hooks/useAppContext";
import formatFileUrl from "../../utils/formatFileUrl";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    cartState: { updateProduct },
  } = useAppContext();

  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [index, setIndex] = useState(0);

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
  if (!product) return null;

  return (
    <Layout className="d-flex flex-column" style={{ gap: 20 }}>
      <Row className="d-flex">
        <Col xs={12} sm={12} md={6}>
          <img
            src={formatFileUrl(images[index])}
            style={{ maxWidth: "100%" }}
          />
          <div
            className="d-flex align-items-center"
            style={{ overflowY: "auto", gap: 15, maxWidth: "100%" }}
          >
            {images.map((img, i) => {
              return (
                <div style={{ width: 75, height: 75, padding: 2 }}>
                  <img
                    key={img}
                    src={formatFileUrl(img)}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: i === index ? "1px solid #888888" : 0,
                    }}
                    onClick={() => setIndex(i)}
                  />
                </div>
              );
            })}
          </div>
        </Col>
        <Col xs={6} className="d-flex flex-column" style={{ gap: 30 }}>
          <div className="d-flex flex-column" style={{ gap: 5 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: 10, opacity: 0.7 }}>{description}</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{Currency(price)}</div>
          <div className="d-flex" style={{ gap: 30 }}>
            <div className="d-flex align-items-center" style={{ gap: 20 }}>
              <img
                src="/minus.png"
                style={{ cursor: "pointer", width: 25, height: 25 }}
                onClick={() =>
                  count > 1 ? setCount(count - 1) : setCount(count)
                }
              />
              <div>{count}</div>
              <img
                src="/add.png "
                style={{ cursor: "pointer", width: 25, height: 25 }}
                onClick={() =>
                  count < quantity ? setCount(count + 1) : setCount(count)
                }
              />
            </div>
            <div>
              <div className="d-flex" style={{ gap: 3 }}>
                <div style={{ fontSize: 12 }}>Chỉ còn </div>
                <div style={{ color: "#ec9c63", fontSize: 12 }}>
                  {quantity} sản phẩm
                </div>
                <div style={{ fontSize: 12 }}> còn lại</div>
              </div>
              <div style={{ fontSize: 12 }}>Đừng bỏ lỡ!!</div>
            </div>
          </div>
          <Button
            color="success"
            style={{ width: "50%" }}
            onClick={() => {
              updateProduct({ _id: id, quantity: count, name, price });
              NotificationManager.success("Add to cart successfully");
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default ProductDetail;
