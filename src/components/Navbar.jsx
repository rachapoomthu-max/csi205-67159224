import { Link, useLocation } from "react-router-dom";

function Navbar({ carts, setToken }) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/calculator", label: "Calculator" },
    { path: "/animation", label: "Animation" },
    { path: "/component", label: "Component" },
    { path: "/todo", label: "Todo" },
    { path: "/products", label: "Products" },
    { path: "/carts", label: "Carts" }
  ];

  return (
    <nav className="py-4">
      <div className="d-flex justify-content-center flex-wrap" style={{ gap: "10px" }}>
        {navItems.map((item) => (
          <div key={item.path} className="position-relative">
            <Link to={item.path}>
              <button
                className={`btn btn-outline-primary ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </button>
            </Link>

            {item.label === "Carts" && carts.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carts.length > 99 ? "99+" : carts.length}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </div>
        ))}
        <button className="btn btn-outline-danger" onClick={() => setToken("")}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
