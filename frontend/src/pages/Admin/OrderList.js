import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import { NotificationManager } from "react-notifications";
import moment from "moment";

import AdminLayout from "./components/AdminLayout";

import { getOrders, deleteOrder } from "../../services/order.service";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const deleteData = async (id) => {
    try {
      if (window.confirm("Are you sure you wish to delete this order?")) {
        await deleteOrder(id);
        await getData();

        NotificationManager.success("Deleted order successfully");
      }
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const getData = async () => {
    try {
      const res = await getOrders();

      setOrders(res.data);
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout>
      <div style={{ padding: "20px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              padding: "0 30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h5>Order List</h5>
            <div
              onClick={() => navigate("/admin/orders/create")}
              style={{ cursor: "pointer" }}
            >
              <img src="/add.png" alt="Add" style={{ height: "30px" }} />
            </div>
          </div>
          <Table
            bordered
            hover
            responsive
            style={{
              borderRadius: "5px",
              overflow: "hidden",
              maxHeight: "400px",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <th
                    scope="row"
                    style={{ maxWidth: "100px", overflowX: "scroll" }}
                  >
                    {order._id}
                  </th>
                  <td
                    scope="row"
                    style={{ maxWidth: "150px", overflowX: "scroll" }}
                  >
                    {order.name}
                  </td>
                  <td
                    scope="row"
                    style={{ maxWidth: "200px", overflowX: "scroll" }}
                  >
                    {order.address}
                  </td>
                  <td>{order.phoneNumber}</td>
                  <td>
                    {moment(new Date(order.createdAt)).format("DD/MM/YYYY")}
                  </td>
                  <td>{order.status}</td>
                  <td
                    style={{
                      minHeight: "60px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <img src="/edit.png" alt="Edit" />
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => deleteData(order._id)}
                    >
                      <img
                        src="/remove.png"
                        alt="Remove"
                        style={{ height: "20px" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderList;
