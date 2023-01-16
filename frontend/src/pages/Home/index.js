import { Container, Row, Col, Button, Input } from "reactstrap";
import { useState, useEffect } from "react";
import Select from "react-select";

import ProductDetail from "./components/ProductDetail";
import Paginations from "../Paginations";
import { getProducts } from "../../services/products.service";
import { getCategories } from "../../services/category.service";
import Layout from "../../components/Layout";
import CategoryBar from "./components/CategoryBar";

const limit = 24;

const listPrice = [
  { greater: 0, less: 10000000, name: "Dưới 10 triệu" },
  { greater: 10000000, less: 20000000, name: "10-20 triệu" },
  { greater: 20000000, less: 30000000, name: "20-30 triệu" },
  { greater: 30000000, less: 40000000, name: "30-40 triệu" },
  { greater: 40000000, name: "hơn 40 triệu" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [cpuId, setCpuId] = useState("");
  const [gt, setGt] = useState(0);
  const [lt, setlt] = useState();
  const [price, setPrice] = useState(null);

  const getListProducts = async () => {
    try {
      const res = await getProducts({
        page,
        limit,
        categoryId,
        gt,
        lt,
        price,
        cpuId,
      });
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

  const sortPrice = [
    { value: 1, label: "Bán chạy nhất" },
    { value: 2, label: "Giá thấp đến cao" },
    { value: 3, label: "Giá cao đến thấp" },
  ];

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [categoryId, gt, lt, price, gt, lt, cpuId]);

  useEffect(() => {
    getListProducts();
  }, [page, categoryId, gt, lt, price, cpuId]);

  console.log(products);
  console.log(categories);
  console.log(cpuId);

  return (
    <Layout>
      <div className="d-flex flex-column" style={{ gap: 15 }}>
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
        <div className="d-flex justify-content-between">
          <div className="d-flex" style={{ gap: 5 }}>
            {listPrice.map((item) => {
              return (
                <Button
                  color={
                    item.greater == gt && item.less == lt
                      ? "success"
                      : "secondary"
                  }
                  size="sm"
                  style={{ fontSize: 12 }}
                  onClick={() => {
                    setGt(item.greater);
                    setlt(item.less);
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <div style={{ width: 200 }}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={sortPrice[0]}
                placeholder="Sắp xếp theo"
                name="sort"
                options={sortPrice}
                onChange={(selectedOption) => {
                  if (selectedOption.value == 1) setPrice("");
                  if (selectedOption.value == 2) setPrice("asc");
                  if (selectedOption.value == 3) setPrice("desc");
                }}
              />
            </div>
            <div className="d-flex align-items-center" style={{ gap: 5 }}>
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                style={{ height: 37, fontSize: 12 }}
              ></Input>
              <Button color="success">
                {" "}
                <img src="/search.png" />
              </Button>
            </div>
          </div>
        </div>
        <div className="d-flex" style={{ gap: 20 }}>
          <CategoryBar
            categories={categories}
            setCategoryId={setCategoryId}
            setCpuId={setCpuId}
          />
          <div>
            <h5 className="mb-0">Danh sách sản phẩm</h5>
            <Row>
              {products.map((product) => {
                return (
                  <Col xs={6} sm={4} md={3} lg={3} xl={3} className="p-2">
                    <ProductDetail product={product} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
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
