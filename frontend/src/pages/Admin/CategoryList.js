import { useState, useEffect } from "react";
import { Table, Button, Input } from "reactstrap";
import { NotificationManager } from "react-notifications";

import AdminLayout from "./components/AdminLayout";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category.service";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [creatingItem, setCreatingItem] = useState(false);
  const [creatingValue, setCreatingValue] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingValue, setEditingValue] = useState(null);

  const setEditing = (item, value) => {
    setEditingItem(item);
    setEditingValue(value);
  };

  const createData = async (data) => {
    try {
      await createCategory(data);
      await getData();

      NotificationManager.success("Created category successfully");
    } catch (err) {
      NotificationManager.error(err.message);
    }

    setCreatingItem(false);
    setCreatingValue("");
  };

  const cancelCreating = () => {
    setCreatingItem(false);
    setCreatingValue("");
  };

  const deleteData = async (id) => {
    try {
      if (window.confirm("Are you sure you wish to delete this category?")) {
        await deleteCategory(id);
        await getData();

        NotificationManager.success("Deleted category successfully");
      }
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const updateData = async (id, data) => {
    try {
      await updateCategory(id, data);
      await getData();

      NotificationManager.success("Updated category successfully");
    } catch (err) {
      NotificationManager.error(err.message);
    }

    setEditingItem(null);
    setEditingValue(null);
  };

  const getData = async () => {
    try {
      const res = await getCategories();

      setCategories(res.data);
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
        <div className="d-flex flex-column" style={{ gap: "20px" }}>
          <div>
            <h5>Danh sách phân loại</h5>
            {!creatingItem ? (
              <Button
                size="sm"
                color="success"
                onClick={() => setCreatingItem(true)}
              >
                Thêm loại sản phẩm
              </Button>
            ) : (
              <div className="d-flex" style={{ gap: "10px" }}>
                <Input
                  value={creatingValue}
                  onChange={(e) => setCreatingValue(e.target.value)}
                  placeholder="Tên Loại sản phẩm"
                  style={{ width: 300 }}
                />
                <Button
                  size="sm"
                  color="success"
                  onClick={() => createData({ name: creatingValue })}
                >
                  Xác nhận
                </Button>
                <Button onClick={() => cancelCreating()}>Hủy bỏ</Button>
              </div>
            )}
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
                  <th>ID</th>
                  <th>Tên </th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <th
                      scope="column"
                      style={{ maxWidth: "70px", overflowX: "scroll" }}
                    >
                      {category._id}
                    </th>
                    <td scope="column" style={{ maxWidth: "100px" }}>
                      {editingItem === category._id.toString() ? (
                        <Input
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                        />
                      ) : (
                        category.name
                      )}
                    </td>
                    <td
                      scope="row"
                      style={{
                        padding: "10px 0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {
                        <>
                          <Button
                            size="sm"
                            color="success"
                            onClick={() =>
                              editingItem === category._id.toString()
                                ? updateData(category._id, {
                                    name: editingValue,
                                  })
                                : setEditing(category._id, category.name)
                            }
                          >
                            {editingItem === category._id.toString()
                              ? "Xác nhận"
                              : "Chỉnh sửa"}
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => deleteData(category._id)}
                          >
                            Xóa
                          </Button>
                        </>
                      }
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

export default CategoryList;
