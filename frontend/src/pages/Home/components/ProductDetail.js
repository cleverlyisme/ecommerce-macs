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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import Currency from "../../../utils/formatCurrency";
import useAppContext from "../../../hooks/useAppContext";
import formatFileUrl from "../../../utils/formatFileUrl";

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();

  const { images, price, name, _id } = product;
  const {
    cartState: { updateProduct },
  } = useAppContext();

  return (
    <Card className="p-0" style={{ overflow: "hidden" }}>
      <img
        alt="Sample"
        src={formatFileUrl(images[0])}
        style={{
          maxHeight: 120,
          aspectRatio: "3 / 2",
          objectFit: "cover",
          objectPosition: "center",
          cursor: "pointer",
        }}
      />
      ;
      <CardBody className="p-2">
        <CardTitle
          style={{ fontWeight: 600, cursor: "pointer" }}
          onClick={() => navigate("/products/" + _id)}
        >
          {name}
        </CardTitle>
        <CardText className="d-flex align-items-center mb-2" style={{ gap: 2 }}>
          <div
            className="text-secondary"
            style={{ fontWeight: 600, fontSize: 12 }}
          >
            {Currency(price)}
          </div>
        </CardText>
        <Button
          color="success"
          size="sm"
          style={{ fontSize: 8, borderRadius: "30px" }}
          onClick={() => {
            updateProduct({ _id, quantity: 1, name, price });
            NotificationManager.success("Add to cart successfully");
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductDetail;
