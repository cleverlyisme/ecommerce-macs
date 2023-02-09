import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NotificationManager } from "react-notifications";
import moment from "moment";

import AdminLayout from "./components/AdminLayout";
import formatCurrency from "../../utils/formatCurrency";
import Paginations from "../Paginations";

import { getUsers } from "../../services/user.service";

const limit = 20;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const getListUser = async () => {
    try {
      const res = await getUsers({ page, limit });
      setUsers(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getListUser();
  }, [page]);

  return (
    <AdminLayout>
      <div className="p-2">
        <div>
          <h5>Danh sách người dùng</h5>
          <div
            style={{
              maxHeight: "500px",
              overflow: "scroll",
            }}
          >
            <Table bordered>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>số điện thoại</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                  );
                })}
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

export default UsersList;
