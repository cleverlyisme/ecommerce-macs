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
      <div className="p-2">
        <div>
          <h5>Order List</h5>
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
                      <div className="d-flex flex-column" style={{ gap: 16 }}>
                        {order.products.map((product) => (
                          <div
                            key={product.productId}
                            className="d-flex flex-column"
                          >
                            <span className="fw-bold">{product.name}</span>
                            <span style={{ fontStyle: "italic" }}>
                              Quantity: {product.quantity}
                            </span>
                            <span style={{ fontStyle: "italic" }}>
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                        ))}
                      </div>
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
                      {order.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
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
                            size="sm"
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
                            size="sm"
                            color="danger"
                            onClick={() => deleteData(order._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
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
