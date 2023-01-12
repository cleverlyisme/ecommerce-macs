import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import Select from "react-select";

import ProductDetail from "./components/ProductDetail";
import Paginations from "../Paginations";
import { getProducts } from "../../services/products.service";
import { getCategories } from "../../services/category.service";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const limit = 24;

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
    setPage(1);
  }, [categoryId]);

  useEffect(() => {
    getListProducts();
  }, [page, categoryId]);

  return (
    <Layout>
      <div className="d-flex flex-column" style={{ gap: 10 }}>
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
        <div className="d-flex align-items-center" style={{ gap: 10 }}>
          <div>Phân loại</div>
          <div style={{ width: 200 }}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={getNameCategory[0]}
              isClearable={true}
              placeholder="Phân loại"
              name="category"
              options={getNameCategory}
              onChange={(selectedOption) =>
                selectedOption !== null
                  ? setCategoryId(selectedOption.value)
                  : setCategoryId("")
              }
            />
          </div>
        </div>

        <h5 className="mb-0">Danh sách sản phẩm</h5>
        <Row>
          {products.map((product) => {
            return (
              <Col xs={6} sm={4} md={3} lg={2} xl={2} className="p-2">
                <ProductDetail product={product} />
              </Col>
            );
          })}
        </Row>
        <div className="d-flex py-3 align-items-center" style={{ gap: 10 }}>
          <div>Trang</div>
          <div style={{ width: 80 }}>
            <Paginations
              setPage={setPage}
              page={page}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
