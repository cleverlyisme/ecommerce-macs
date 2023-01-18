import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import moment from "moment";

import { getUserHistory } from "../../services/user.service";
import Currency from "../../utils/formatCurrency";

const History = () => {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const res = await getUserHistory();
      console.log(res.data);
      setHistory(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  console.log(history);

  return (
    <Layout>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Lịch sử đặt hàng</div>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    {moment(new Date(item.createdAt)).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phoneNumber}</td>
                  <td
                    scope="row"
                    style={{ maxWidth: "150px", overflow: "scroll" }}
                  >
                    <div className="d-flex flex-column" style={{ gap: 16 }}>
                      {item.products.map((product) => (
                        <div
                          key={product.productId}
                          className="d-flex flex-column"
                        >
                          <span className="fw-bold">{product.name}</span>
                          <span style={{ fontStyle: "italic" }}>
                            Quantity: {product.quantity}
                          </span>
                          <span style={{ fontStyle: "italic" }}>
                            {Currency(product.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{Currency(item.amount)}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default History;
