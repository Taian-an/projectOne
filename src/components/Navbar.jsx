import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "15px" }}>
        Dashboard
      </Link>

      <Link to="/sales-journal">
        Sales Journal
      </Link>
    </nav>
  );
}

export default Navbar;
