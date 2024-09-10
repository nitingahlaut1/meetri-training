import { FaShoppingCart } from "react-icons/fa";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { RootState } from "../redux/Store";

const Navbar = () => {
  // const { cart } = useSelector((state: RootState) => state);

  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5">
            <img src="../logo.png" className="h-14" alt="logo" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/home">
            <p>Home</p>
          </NavLink>

          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
