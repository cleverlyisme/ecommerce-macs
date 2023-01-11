import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NotificationManager } from "react-notifications";
import moment from "moment";

import AdminLayout from "./components/AdminLayout";
import formatCurrency from "../../utils/formatCurrency";

import {
  getOrders,
  updateOrder,
  deleteOrder,
} from "../../services/order.service";

const OrderList = () => {
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

  const updateData = async (id, status, data) => {
    try {
      if (status === "Canceled") throw new Error(`Order canceled`);
      if (status === data.status) throw new Error(`Order already ${status}`);

      await updateOrder(id, data);
      await getData();

      NotificationManager.success("Updated order successfully");
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
          <div style={{ padding: "0 20px" }}>
            <h5>Order List</h5>
          </div>
          <div
            style={{
              maxHeight: "500px",
              overflow: "scroll",
            }}
          >
            <Table bordered>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <th
                      scope="column"
                      style={{ maxWidth: "70px", overflowX: "scroll" }}
                    >
                      {moment(new Date(order.createdAt)).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                    </th>
                    <td scope="column" style={{ maxWidth: "100px" }}>
                      {order.name}
                    </td>
                    <td
                      scope="column"
                      style={{
                        maxWidth: "120px",
                        maxHeight: "50px",
                      }}
                    >
                      {order.address}
                    </td>
                    <td>{order.phoneNumber}</td>
                    <td
                      scope="row"
                      style={{ maxWidth: "150px", overflow: "scroll" }}
                    >
                      {order.products.map((product) => (
                        <div key={product.productId}>
                          Name: {product.name}, quantity: {product.quantity},
                          price: {formatCurrency(product.price)}
                        </div>
                      ))}
                    </td>
                    <td>
                      {formatCurrency(
                        order.products.reduce((iniValue, product) => {
                          return iniValue + product.quantity * product.price;
                        }, 0)
                      )}
                    </td>
                    <td
                      style={{
                        maxWidth: "50px",
                        overflow: "scroll",
                      }}
                    >
                      {order.status}
                    </td>
                    <td
                      scope="row"
                      style={{
                        padding: "10px 0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Button
                        color="success"
                        onClick={() =>
                          updateData(order._id, order.status, {
                            status: "Completed",
                          })
                        }
                      >
                        Confirm
                      </Button>

                      <Button
                        color="warning"
                        onClick={() =>
                          updateData(order._id, order.status, {
                            status: "Canceled",
                          })
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => deleteData(order._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderList;
