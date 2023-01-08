import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';

const OrderSuccess = () => {
  return (
    <Layout>
      <div className="pt-5 d-flex flex-column align-items-center justify-content-center">
        <img src="/checked.png" alt="checked" />
        <h4>Order successfully.</h4>
        <Link to="/">Continue shopping</Link>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
