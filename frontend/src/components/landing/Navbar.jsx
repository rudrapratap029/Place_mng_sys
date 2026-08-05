import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          PlacePro
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </a>
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;