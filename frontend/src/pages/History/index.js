import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { Table } from "reactstrap";

import { getUserHistory } from "../../services/user.service";

const History = () => {
  const [history, setHistory] = useState(null);

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

  return (
    <Layout>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Lịch sử đặt hàng</div>
        <Table>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Sản phẩm</th>
              <th>Giá tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default History;
