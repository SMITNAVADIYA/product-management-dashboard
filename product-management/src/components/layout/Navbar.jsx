import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="text-lg font-bold tracking-tight text-gray-900"
        >
          Product Management
        </Link>

        <nav className="flex items-center gap-5">
          <NavLink to="/products" className={getNavLinkClass}>
            Products
          </NavLink>

          <NavLink to="/products/add" className={getNavLinkClass}>
            Add Product
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
