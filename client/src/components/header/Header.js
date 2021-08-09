import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Search from "./Search";

function Header() {
  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
        <Link to="/">
          <h1 className="navbar-brand text-uppercase m-0 p-0">Social-Media</h1>
        </Link>

        <Search />

        <Navbar />
      </nav>
    </div>
  );
}

export default Header;
