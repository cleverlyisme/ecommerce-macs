import { useNavigate, useLocation } from "react-router-dom";

const navs = [
  { name: "Product list", url: "/admin/products" },
  { name: "Order list", url: "/admin/orders" },
];

const Navs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) => pathname.includes(path);

  return (
    <div className="py-2 d-flex flex-column" style={{ gap: 8 }}>
      {navs.map((nav) => (
        <div
          key={nav.name}
          style={{
            background: isActive(nav.url) ? "#ccc" : "transparent",
            color: isActive(nav.url) ? "white" : "black",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: 8,
          }}
          onClick={() => navigate(nav.url)}
        >
          {nav.name}
        </div>
      ))}
    </div>
  );
};

export default Navs;
