import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Label, Input, Button } from "reactstrap";
import Select from "react-select";
import { NotificationManager } from "react-notifications";
import { createProduct } from "../../services/products.service";

import AdminLayout from "./components/AdminLayout";
import Images from "./components/Image";
import {
  getProductById,
  update,
  uploadPhoto,
} from "../../services/products.service";
import { getCategories } from "../../services/category.service";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(null);

  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(
        res.data.map((item) => ({ ...item, label: item.name, value: item._id }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    try {
      const res = await getProductById(id);
      setData(res.data);
      setCheck(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const changeData = (field) => (value) =>
    setData({
      ...(data || {}),
      [field]: value,
    });

  useEffect(() => {
    getAllCategories();
    getData();
  }, [id]);

  const submit = async () => {
    try {
      const { name, description, categoryId } = data;
      if ([name, description, categoryId].some((item) => !item || !item.trim()))
        throw new Error("Please fill in all field");

      if (files.length) {
        const formData = new FormData();

        for (const file of files) {
          formData.append("files", file.file);
        }

        const res = await uploadPhoto(formData);
        data.images.push(...res.data);
      }

      await update(data._id, data);
      NotificationManager.success("Update product successfully");
      navigate("/admin/products");
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const createNewProduct = async () => {
    try {
      const { name, description, categoryId } = data;
      if ([name, description, categoryId].some((item) => !item || !item.trim()))
        throw new Error("Please fill in all field");

      if (files.length) {
        const formData = new FormData();

        for (const file of files) {
          formData.append("files", file.file);
        }
        data.images = [];
        const res = await uploadPhoto(formData);
        data.images.push(...res.data);
      }

      await createProduct(data);
      NotificationManager.success("Create product successfully");
      navigate("/admin/products");
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  // if (!data) return null;

  return (
    <AdminLayout>
      <div className="p-2">
        <Row>
          <Col xs={12} md={3}>
            <Images
              files={files}
              setFiles={setFiles}
              images={data?.images || []}
              setImages={changeData("images")}
            />
          </Col>
          <Col xs={12} md={9}>
            <div className="d-flex flex-column" style={{ gap: 16 }}>
              <div>
                <Label>Tên sản phẩm</Label>
                <Input
                  value={data?.name}
                  onChange={(e) => changeData("name")(e.target.value)}
                  placeholder="Tên sản phẩm"
                />
              </div>
              <div>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  value={categories.find(
                    (item) => item?._id === data?.categoryId
                  )}
                  placeholder="Phân loại"
                  name="category"
                  options={categories}
                  onChange={(selectedOption) =>
                    changeData("categoryId")(selectedOption.value)
                  }
                />
              </div>
              <div>
                <Label>Mô tả sản phẩm</Label>
                <Input
                  value={data?.description}
                  onChange={(e) => changeData("description")(e.target.value)}
                  placeholder="Mô tả sản phẩm"
                />
              </div>
              <div>
                <Label>Giá</Label>
                <Input
                  type="number"
                  min={0}
                  value={data?.price}
                  onChange={(e) => changeData("price")(Number(e.target.value))}
                  placeholder="Giá "
                />
              </div>
              <div>
                <Label>Số lượng</Label>
                <Input
                  type="number"
                  min={0}
                  value={data?.quantity}
                  onChange={(e) =>
                    changeData("quantity")(Number(e.target.value))
                  }
                  placeholder="Số lượng"
                />
              </div>
              <div>
                <Label>Đã bán</Label>
                <Input
                  type="number"
                  min={0}
                  value={data?.sold}
                  onChange={(e) => changeData("sold")(Number(e.target.value))}
                  placeholder="Đã bán"
                />
              </div>
              <Button
                color="primary"
                onClick={!check ? createNewProduct : submit}
              >
                {!check ? "Tạo" : "Cập nhật"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default ProductDetail;
