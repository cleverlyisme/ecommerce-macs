import { Link } from 'react-router-dom';
import { Container, Table } from 'reactstrap';

import Header from '../../components/Header';
import Layout from '../../components/Layout';
import useAppContext from '../../hooks/useAppContext';

const Cart = () => {
  const { cart, setCart } = useAppContext();

  return (
    <Layout>
      <h5>Cart</h5>
      <Table striped bordered responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Price</th>
            <th className="text-center">Total</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`/products/${item._id}`}>{item.name}</Link>
              </td>
              <td
                className="d-flex align-items-center justify-content-center"
                style={{ gap: 8 }}
              >
                <span>-</span>
                {item.quantity}
                <span>+</span>
              </td>
              <td className="text-center">{item.price}</td>
              <td className="text-center">{item.quantity * item.price}</td>
              <td className="text-center"></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Cart;
