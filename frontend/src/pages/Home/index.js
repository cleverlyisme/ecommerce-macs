import { Container, Row, Col, Button, Input } from 'reactstrap';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Fade, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import ProductDetail from './components/ProductDetail';
import Paginations from '../Paginations';
import { getProducts, searchProducts } from '../../services/products.service';
import { getCategories } from '../../services/category.service';
import Layout from '../../components/Layout';
import CategoryBar from './components/CategoryBar';

const limit = 24;

const listPrice = [
  { greater: 0, name: 'Tất cả' },
  { greater: 0, less: 10000000, name: '< 10 triệu' },
  { greater: 10000000, less: 20000000, name: '10-20 triệu' },
  { greater: 20000000, less: 30000000, name: '20-30 triệu' },
  { greater: 30000000, less: 40000000, name: '30-40 triệu' },
  { greater: 40000000, name: '> 40 triệu' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [cpuId, setCpuId] = useState('');
  const [gt, setGt] = useState(0);
  const [lt, setlt] = useState();
  const [price, setPrice] = useState(null);
  const [searchValue, setSearchValue] = useState('');

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
        productName: searchValue,
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

  const handleSearch = async () => {
    try {
      const res = await getProducts({
        page,
        limit,
        categoryId,
        gt,
        lt,
        price,
        cpuId,
        productName: searchValue,
      });
      setProducts(res.data.items);
      setTotalPages(res.data.totalPages);
      setPage(1);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getNameCategory = categories.map((category) => {
    return { value: category._id, label: category.name };
  });

  const sortPrice = [
    { value: 1, label: 'Bán chạy nhất' },
    { value: 2, label: 'Giá thấp đến cao' },
    { value: 3, label: 'Giá cao đến thấp' },
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

  const banners = [
    '/banner.jpeg',
    '/banner1.jpeg',
    '/banner2.jpeg',
    '/banner3.jpeg',
    '/banner4.jpeg',
    '/banner5.jpeg',
    '/banner6.jpg',
  ];

  return (
    <Layout>
      <div className="d-flex flex-column" style={{ gap: 15 }}>
        <div>
          <div className="slide-container">
            <Fade
              autoplay
              prevArrow={<div></div>}
              nextArrow={<div></div>}
              duration={700}
            >
              {banners.map((banner) => (
                <div key={banner} className="each-fade">
                  <img
                    src={banner}
                    style={{
                      width: '100%',
                      maxHeight: '200px !important',
                      aspectRatio: '3/1',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: 8,
                    }}
                  />
                </div>
              ))}
            </Fade>
          </div>
        </div>
        <Row>
          <Col xs={12} sm={12} md={8} className="d-flex" style={{ gap: 5 }}>
            {listPrice.map((item) => {
              return (
                <Button
                  color={
                    item.greater == gt && item.less == lt
                      ? 'success'
                      : 'secondary'
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
          </Col>
          <Col
            xs={12}
            sm={12}
            md={2}
            className="my-2 d-flex align-items-center"
            style={{ gap: 20 }}
          >
            <div style={{ width: 200 }}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={sortPrice[0]}
                placeholder="Sắp xếp theo"
                name="sort"
                options={sortPrice}
                onChange={(selectedOption) => {
                  if (selectedOption.value == 1) setPrice('');
                  if (selectedOption.value == 2) setPrice('asc');
                  if (selectedOption.value == 3) setPrice('desc');
                }}
              />
            </div>
          </Col>
          <Col xs={12} sm={12} md={2}>
            <div className="h-100 d-flex align-items-center" style={{ gap: 5 }}>
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                style={{ height: 37, fontSize: 12 }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button color="success" onClick={() => handleSearch()}>
                <img src="/search.png" />
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={3}>
            <CategoryBar
              categories={categories}
              setCategoryId={setCategoryId}
              setCpuId={setCpuId}
            />
          </Col>
          <Col xs={12} sm={12} md={9} className="mt-2">
            <h5 className="mb-0">Danh sách sản phẩm</h5>
            <Row>
              {products.map((product) => {
                return (
                  <Col xs={6} sm={4} md={3} lg={3} xl={3}>
                    <div className="py-2">
                      <ProductDetail product={product} />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <div
          className="d-flex py-3 align-items-center justify-content-end"
          style={{ gap: 10 }}
        >
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
