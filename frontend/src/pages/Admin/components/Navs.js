import { useNavigate, useLocation } from "react-router-dom";

const navs = [
  { name: "User list", url: "/admin/users" },
  { name: "Product list", url: "/admin/products" },
  { name: "Order list", url: "/admin/orders" },
];

const Navs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) => pathname.includes(path);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", borderRadius: "5px", overflow: "hidden" }}>
        {navs.map((nav) => (
          <div
            style={{
              background: isActive(nav.url) ? "#aaa" : "#555",
              color: "#fff",
              cursor: "pointer",
              padding: "4px 8px",
            }}
            onClick={() => navigate(nav.url)}
          >
            {nav.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navs;
