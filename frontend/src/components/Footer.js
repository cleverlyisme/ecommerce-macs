import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';

const fbLink = 'https://www.facebook.com/profile.php?id=100007712806834';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1d1d1f' }}>
      <div
        className="py-2 d-flex flex-column justify-content-center align-items-center"
        style={{ gap: 8 }}
      >
        <p className="text-center text-white fw-bold mb-0">
          <span style={{ color: '#ccc' }}>Copyright © 2023</span> ShopMacs
        </p>
        <p className="text-center text-white mb-0" style={{ fontSize: 13 }}>
          0988113999
        </p>
        <p className="text-center text-white mb-0" style={{ fontSize: 13 }}>
          49 Văn Hội, Bắc Từ Liêm, Hà Nội
        </p>
        <img
          src="/fb.png"
          alt="fb"
          width="16px"
          height="16px"
          style={{ cursor: 'pointer' }}
          onClick={() => window.open(fbLink)}
        />
      </div>
    </div>
  );
};

export default Footer;
