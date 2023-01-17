import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import formatFileUrl from "../../../utils/formatFileUrl";
import Currency from "../../../utils/formatCurrency";

const RelatedProducts = (props) => {
  const navigate = useNavigate();

  const { product } = props;
  const { _id, name, images, price, rating, sold } = product;

  return (
    <Card
      style={{
        overflow: "hidden",
      }}
      className="p-0"
    >
      <img
        alt="Sample"
        src={formatFileUrl(images[0])}
        style={{
          maxHeight: 120,
          aspectRatio: "3 / 2",
          objectFit: "cover",
        }}
      />
      <CardBody>
        <CardTitle
          style={{ cursor: "pointer" }}
          tag="h6"
          onClick={() => navigate("/products/" + _id)}
        >
          {name}
        </CardTitle>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Đã bán {sold} sản phẩm</div>
        <CardText className="d-flex align-items-center mb-2" style={{ gap: 2 }}>
          <div
            className="text-secondary"
            style={{ fontWeight: 600, fontSize: 12 }}
          >
            {Currency(price)}
          </div>
        </CardText>{" "}
      </CardBody>
    </Card>
  );
};

export default RelatedProducts;
