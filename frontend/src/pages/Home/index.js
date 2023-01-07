import { Container, Row, Col, Button, FormGroup, Input } from "reactstrap";
import { useState, useEffect } from "react";
import Select from "react-select";

import ProductDetail from "../ProductDetail/ProductDetail";
import Paginations from "../Paginations";
import { getProducts } from "../../services/products.service";
import { getCategories } from "../../services/category.service";

const limit = 2;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  const getListProducts = async () => {
    try {
      const res = await getProducts({ page, limit, categoryId });
      setProducts(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getListCategory = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getNameCategory = categories.map((category) => {
    return { value: category._id, label: category.name };
  });

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    getListProducts();
  }, [page, categoryId]);

  return (
    <Container className="d-flex flex-column" style={{ gap: 10 }}>
      <Row className="d-flex py-2">
        <Col xs={6}>
          <div style={{ fontWeight: 600, color: "#013b28" }}>ShopMac</div>
        </Col>
        <Col xs={6} className="d-flex justify-content-end" style={{ gap: 25 }}>
          <div className="d-flex align-items-center " style={{ gap: 10 }}>
            <img src="/account.png" />
            <div style={{ fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Account
            </div>
          </div>

          <div className="d-flex align-items-center" style={{ gap: 5 }}>
            <img src="/cart.png" />
            <div style={{ fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Cart
            </div>
          </div>
        </Col>
      </Row>
      <div className="w-100 d-flex align-items-center">
        <img
          src="/banner.png"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </div>
      {/* <div className="d-flex" style={{ gap: 15 }}>
        {categories.map((category) => {
          return (
            <Button
              key={category._id}
              color="success"
              style={{
                borderRadius: "30px",
                backgroundColor:
                  categoryId === category._id ? "#198754" : "transparent",
                color: categoryId === category._id ? "white" : "black",
              }}
              size="sm"
              onClick={() => setCategoryId(category._id)}
            >
              {category.name}
            </Button>
          );
        })}
      </div> */}
      <Select
        className="basic-single w-50"
        classNamePrefix="select"
        defaultValue={getNameCategory[0]}
        isClearable={true}
        name="category"
        options={getNameCategory}
        onChange={(selectedOption) =>
          selectedOption !== null
            ? setCategoryId(selectedOption.value)
            : setCategoryId("")
        }
      />

      <h5 className="mb-0">Macbook for you!</h5>
      <Row>
        {products.map((product) => {
          return (
            <Col xs={6} sm={4} md={3} lg={2} xl={2} className="p-2">
              <ProductDetail product={product} />
            </Col>
          );
        })}
      </Row>
      <Paginations setPage={setPage} page={page} totalPages={totalPages} />
    </Container>
  );
};

export default Home;
