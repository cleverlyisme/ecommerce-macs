import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { NotificationManager } from "react-notifications";

import AdminLayout from "./components/AdminLayout";

import {
  getCategories,
  createCategory,
  createCpu,
  updateCategory,
  updateCpu,
  deleteCategory,
  deleteCpu,
} from "../../services/category.service";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [creatingCate, setCreatingCate] = useState(false);
  const [creatingCateValue, setCreatingCateValue] = useState("");
  const [editingCate, setEditingCate] = useState(null);
  const [editingCateValue, setEditingCateValue] = useState(null);
  const [creatingCpu, setCreatingCpu] = useState(false);
  const [creatingCpuValue, setCreatingCpuValue] = useState("");
  const [editingCpu, setEditingCpu] = useState(false);
  const [editingCpuValue, setEditingCpuValue] = useState(null);

  const setEditCate = (item, value) => {
    setEditingCate(item);
    setEditingCateValue(value);
  };

  const setEditCpu = (item, value) => {
    setEditingCpu(item);
    setEditingCpuValue(value);
  };

  const createCate = async (data) => {
    try {
      await createCategory(data);
      await getData();

      NotificationManager.success("Created category successfully");
    } catch (err) {
      NotificationManager.error(err.message);
    }

    setCreatingCate(false);
    setCreatingCateValue("");
  };

  const createCpuData = async (cateId, data) => {
    try {
      await createCpu(cateId, data);
      await getData();

      NotificationManager.success("Created CPU successfully");
    } catch (err) {
      NotificationManager.error(err.message);
    }

    setCreatingCpu(false);
    setCreatingCpuValue("");
  };

  const cancelCreateCate = () => {
    setCreatingCate(false);
    setCreatingCateValue("");
  };

  const cancelCreateCpu = () => {
    setCreatingCpu(false);
    setCreatingCpuValue("");
  };

  const deleteCateData = async (id) => {
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

  const deleteCpuData = async (cateId, cpuId) => {
    try {
      if (window.confirm("Are you sure you wish to delete this CPU?")) {
        await deleteCpu(cateId, cpuId);
        await getData();

        NotificationManager.success("Deleted CPU successfully");
      }
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const updateCateData = async (id, data) => {
    try {
      await updateCategory(id, data);
      await getData();

      NotificationManager.success("Updated category successfully");
    } catch (err) {
      NotificationManager.error(err.message);
    }

    setEditingCate(null);
    setEditingCateValue(null);
  };

  const updateCpuData = async (cateId, cpuId, data) => {
    try {
      await updateCpu(cateId, cpuId, data);
      await getData();

      NotificationManager.success("Updated CPU successfully");
    } catch (err) {
      NotificationManager.error(err.message);
    }

    setEditingCpu(null);
    setEditingCpuValue(null);
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
            {!creatingCate ? (
              <Button
                size="sm"
                color="success"
                onClick={() => setCreatingCate(true)}
              >
                Thêm loại sản phẩm
              </Button>
            ) : (
              <div className="d-flex" style={{ gap: "10px" }}>
                <Input
                  value={creatingCateValue}
                  onChange={(e) => setCreatingCateValue(e.target.value)}
                  placeholder="Tên Loại sản phẩm"
                  style={{ width: 300 }}
                />
                <Button
                  size="sm"
                  color="success"
                  onClick={() => createCate({ name: creatingCateValue })}
                >
                  Xác nhận
                </Button>
                <Button onClick={() => cancelCreateCate()}>Hủy bỏ</Button>
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
                  <th>CPU</th>
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
                      {editingCate === category._id.toString() ? (
                        <Input
                          value={editingCateValue}
                          onChange={(e) => setEditingCateValue(e.target.value)}
                        />
                      ) : (
                        category.name
                      )}
                    </td>
                    <td>
                      {category.cpu.map((c) => (
                        <div className="d-flex">
                          {editingCpu === c._id.toString() ? (
                            <Input
                              bsSize="sm"
                              value={editingCpuValue}
                              onChange={(e) =>
                                setEditingCpuValue(e.target.value)
                              }
                            />
                          ) : (
                            <span style={{ flexGrow: "1" }}>{c.text}</span>
                          )}
                          <div
                            style={{ padding: "2px", cursor: "pointer" }}
                            onClick={() =>
                              editingCpu === c._id.toString()
                                ? updateCpuData(category._id, c._id, {
                                    text: editingCpuValue,
                                  })
                                : setEditCpu(c._id, c.text)
                            }
                          >
                            {editingCpu === c._id.toString() ? (
                              <img src="/confirm.png" alt="Edit" />
                            ) : (
                              <img src="/edit.png" alt="Edit" />
                            )}
                          </div>
                          <div
                            style={{ padding: "2px", cursor: "pointer" }}
                            onClick={() => deleteCpuData(category._id, c._id)}
                          >
                            <img
                              src="/remove.png"
                              alt="Delete"
                              style={{ width: "20px" }}
                            />
                          </div>
                        </div>
                      ))}
                      {creatingCpu === category._id.toString() ? (
                        <div className="d-flex">
                          <Input
                            bsSize="sm"
                            placeholder="Enter cpu..."
                            value={creatingCpuValue}
                            onChange={(e) =>
                              setCreatingCpuValue(e.target.value)
                            }
                          />
                          <div
                            style={{ padding: "5px", cursor: "pointer" }}
                            onClick={() =>
                              createCpuData(category._id, {
                                text: creatingCpuValue,
                              })
                            }
                          >
                            <img src="/confirm.png" alt="Confirm" />
                          </div>

                          <div
                            style={{ padding: "5px", cursor: "pointer" }}
                            onClick={() => cancelCreateCpu()}
                          >
                            <img src="/cancel.png" alt="Cancel" />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="d-flex justify-content-center"
                          style={{ cursor: "pointer" }}
                          onClick={() => setCreatingCpu(category._id)}
                        >
                          <img
                            src="/add.png"
                            alt="Add"
                            style={{ width: "24px" }}
                          />
                        </div>
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
                              editingCate === category._id.toString()
                                ? updateCateData(category._id, {
                                    name: editingCateValue,
                                  })
                                : setEditCate(category._id, category.name)
                            }
                          >
                            {editingCate === category._id.toString()
                              ? "Xác nhận"
                              : "Chỉnh sửa"}
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => deleteCateData(category._id)}
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
