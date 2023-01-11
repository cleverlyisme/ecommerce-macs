import { Container, Table } from 'reactstrap';
import { getProducts } from '../../services/products.service';

import { useState, useEffect } from 'react';

import AdminLayout from './components/AdminLayout';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getListProduct = async () => {
    try {
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-2">
        <h5>Product List</h5>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ProductList;
