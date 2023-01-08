import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import Layout from '../../components/Layout';
import useAppContext from '../../hooks/useAppContext';
import formatCurrency from '../../utils/formatCurrency';

const Cart = () => {
  const {
    cartState: { cart, amount, updateProduct, removeProduct },
  } = useAppContext();

  const reduce = (_id, quantity) => {
    if (quantity > 1) {
      updateProduct({ _id, quantity: quantity - 1 });
    }
  };

  const add = (_id, quantity) => {
    updateProduct({ _id, quantity: quantity + 1 });
  };

  return (
    <Layout>
      <h5>Cart</h5>
      <Table striped bordered responsive size="sm">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th style={{ width: '20%' }}>Name</th>
            <th className="text-center" style={{ width: '10%' }}>
              Quantity
            </th>
            <th className="text-center" style={{ width: '20%' }}>
              Price
            </th>
            <th className="text-center" style={{ width: '20%' }}>
              Total
            </th>
            <th className="text-center" style={{ width: '20%' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item._id}>
              <th scope="row" className="text-center">
                {index + 1}
              </th>
              <td>
                <Link to={`/products/${item._id}`}>{item.name}</Link>
              </td>
              <td
                className="d-flex align-items-center justify-content-center"
                style={{ gap: 8 }}
              >
                <img
                  src="/minus.png"
                  alt="minus"
                  width="20px"
                  height="20px"
                  style={{ cursor: 'pointer' }}
                  onClick={() => reduce(item._id, item.quantity)}
                />
                {item.quantity}
                <img
                  src="/add.png"
                  alt="add"
                  width="20px"
                  height="20px"
                  style={{ cursor: 'pointer' }}
                  onClick={() => add(item._id, item.quantity)}
                />
              </td>
              <td className="text-center">{formatCurrency(item.price)}</td>
              <td className="text-center">
                {formatCurrency(item.quantity * item.price)}
              </td>
              <td className="text-center">
                <img
                  src="/remove.png"
                  width="20px"
                  height="20px"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (
                      // eslint-disable-next-line
                      confirm('Do you want to remove this product from cart?')
                    ) {
                      removeProduct(item._id);
                    }
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td className="fw-bold text-center">{formatCurrency(amount)}</td>
            <td />
          </tr>
        </tbody>
      </Table>
    </Layout>
  );
};

export default Cart;
