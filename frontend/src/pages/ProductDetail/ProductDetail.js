import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const ProductDetail = ({ product }) => {
  const { image, price, name } = product;
  return (
    <Card className="p-0" style={{ overflow: "hidden" }}>
      <img
        alt="Sample"
        src={image}
        style={{
          maxHeight: 120,
          aspectRatio: "3 / 2",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <CardBody className="p-2">
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardText className="d-flex align-items-center mb-2" style={{ gap: 2 }}>
          <div
            className="text-secondary"
            style={{ fontWeight: 600, fontSize: 12 }}
          >
            ${price}
          </div>
        </CardText>
        <Button
          color="success"
          size="sm"
          style={{ fontSize: 8, borderRadius: "30px" }}
        >
          Add to cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductDetail;
