import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

import Layout from '../../components/Layout';
import Information from './components/Information';
import useAppContext from '../../hooks/useAppContext';
import formatCurrency from '../../utils/formatCurrency';
import { create } from '../../services/order.service';

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartState: { cart, amount, updateProduct, removeProduct, cleanCart },
  } = useAppContext();

  const reduce = (_id, quantity) => {
    if (quantity > 1) {
      updateProduct({ _id, quantity: -1 });
    }
  };

  const add = (_id) => {
    updateProduct({ _id, quantity: 1 });
  };

  const onConfirm = async (data) => {
    try {
      await create(data);
      cleanCart();
      NotificationManager.success('Order succesfully');
      navigate('/order-success');
    } catch (err) {
      console.error(err);
      NotificationManager.error(
        (err.response && err.response.data) || err.message
      );
    }
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
                  onClick={() => add(item._id)}
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
      <Information cart={cart} onConfirm={onConfirm} />
    </Layout>
  );
};

export default Cart;
