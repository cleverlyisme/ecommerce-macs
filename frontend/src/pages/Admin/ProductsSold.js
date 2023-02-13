import { useState, useEffect } from "react";
import { Table, Button, Input } from "reactstrap";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import DatePicker from "react-datepicker";

import AdminLayout from "./components/AdminLayout";
import formatCurrency from "../../utils/formatCurrency";
import Paginations from "../Paginations";
import { getStatistic } from "../../services/statistic.service";
import Currency from "../../utils/formatCurrency";

const limit = 10;

const ProductSold = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState(Date.now() - 86400000);
  const [to, setTo] = useState(Date.now());
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(0);

  const getProductSold = async () => {
    try {
      const res = await getStatistic({ from, to, page, limit });
      console.log({ from, to, page, limit });
      setTotalPages(res.data.totalPages);
      setAmount(res.data.items.amount);
      setOrders(res.data.items.orders);
      setProducts(res.data.items.products);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProductSold();
  }, [page, from, to, limit]);

  console.log(products);
  console.log(orders);

  return (
    <AdminLayout>
      <div className="p-2">
        <div>
          <h5>Danh sách sản phẩm đã bán</h5>
          <div
            className="d-flex "
            style={{ gap: "5px", width: "360px", marginRight: "10px" }}
          >
            <DatePicker
              containerStyle={{ width: "49%" }}
              showIcon
              //   placeholderText="Date"
              customInput={<Input />}
              selected={from}
              onChange={(date) => setFrom(date.getTime())}
            />
            <div
              className="d-flex pt-1"
              style={{ flexGrow: 1, fontWeight: 600 }}
            >
              -
            </div>
            <DatePicker
              containerStyle={{ width: "49%" }}
              showIcon
              //   placeholderText="Date"
              customInput={<Input />}
              selected={to}
              onChange={(date) => setTo(date.getTime())}
            />
          </div>

          <div
            className="pt-3"
            style={{
              maxHeight: "500px",
              overflow: "scroll",
            }}
          >
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Tổng giá</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  return (
                    <tr>
                      <th>{index + 1 + (page - 1) * limit}</th>
                      <td
                        scope="row"
                        style={{ maxWidth: "150px", overflow: "scroll" }}
                      >
                        <div className="d-flex flex-column" style={{ gap: 16 }}>
                          {order.products.map((product) => (
                            <div
                              key={product.productId}
                              className="d-flex flex-column"
                            >
                              <span className="fw-bold">{product.name}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column" style={{ gap: 16 }}>
                          {order.products.map((product) => (
                            <div
                              key={product.productId}
                              className="d-flex flex-column"
                            >
                              {product.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>{Currency(order.amount)}</td>
                      {/* <th>{product.quantity}</th>
                      <th>{product.amount}</th> */}
                    </tr>
                  );
                })}
                <tr className={page == totalPages ? "p-0" : "d-none"}>
                  <th colSpan={3}></th>
                  <th>{Currency(amount)}</th>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-end mb-2"
        style={{ width: "100%" }}
      >
        <Paginations
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          style={{ width: 80 }}
        />
      </div>
    </AdminLayout>
  );
};

export default ProductSold;
