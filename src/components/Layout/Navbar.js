import { Link } from "react-router-dom";
import { isLoggedIn, removeToken, getUserRole } from "../../utils/auth";
import { useState } from "react";
import SafetyGuidelinesPage from "../../pages/SafetyGuidelinesPage";

export default function Navbar() {
  const role = getUserRole(); // "Admin" | "User"
  const loggedIn = isLoggedIn();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    window.location.href = "/login";
  };

  const handleUnauthorizedClick = (e, featureName) => {
    e.preventDefault();
    alert(`Please login to ${featureName.toLowerCase()}`);
    window.location.href = "/register"; // reg page a niye jabe
  };

  // login kora na thakle onno kono page a click korle login page a niye jabe
  const handleUnauthorizedNavClick = (e) => {
    e.preventDefault();
    alert("Please register first to access this feature");
    window.location.href = "/register";
  };

  return (
    <nav className="bg-gradient-to-r from-red-700 to-red-800 text-white fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link
          to="/home"
          className="text-2xl font-bold hover:text-red-200 transition-colors duration-200"
        >
          Blood
          <span className="text-red-200 hover:text-white transition-colors duration-200">
            Bank
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/home"
            className="hover:text-red-200 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-red-200 transition-colors duration-200"
          >
            About
          </Link>

          {/* <div className="hidden md:flex items-center gap-6">
          <Link
            to="/home"
            className="hover:text-red-200 transition-colors duration-200"
          >
            Home
          </Link> */}

          <Link
            to="/safety-guidelines"
            className="hover:text-red-200 transition-colors duration-200"
          >
            Guidelines
          </Link>

          {/* { Search Donors - login kora na thakle onno kono page a click korle reg page a niye jabe/} */}
          {loggedIn ? (
            <Link
              to="/search"
              className="hover:text-red-200 transition-colors duration-200"
            >
              Search Donors
            </Link>
          ) : (
            <button
              onClick={handleUnauthorizedNavClick}
              className="hover:text-red-200 transition-colors duration-200 cursor-pointer"
            >
              Search Donors
            </button>
          )}

          {/* Contact - login kora na thakle onno kono page a click korle reg page a niye jabe */}
          {loggedIn ? (
            <Link
              to="/contact"
              className="hover:text-red-200 transition-colors duration-200"
            >
              Contact
            </Link>
          ) : (
            <button
              onClick={handleUnauthorizedNavClick}
              className="hover:text-red-200 transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
          )}

          {/* Add Blood Request - login kora na thakle onno kono page a click korle reg page a niye jabe */}
          {loggedIn ? (
            <Link
              to="/blood-request"
              className="hover:text-red-200 transition-colors duration-200"
            >
              Add Blood Request
            </Link>
          ) : (
            <button
              onClick={handleUnauthorizedNavClick}
              className="hover:text-red-200 transition-colors duration-200 cursor-pointer"
            >
              Add Blood Request
            </button>
          )}

          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-white text-red-700 px-4 py-1 rounded hover:bg-red-100 hover:text-red-800 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {role === "Admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/donor/dashboard"
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Donor Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-white text-red-700 px-4 py-1 rounded hover:bg-red-100 hover:text-red-800 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl hover:text-red-200 transition-colors duration-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-red-800 px-4 py-4 space-y-3">
          <Link
            to="/home"
            className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>

          {/* Search Donors - Mobile */}
          {loggedIn ? (
            <Link
              to="/search"
              className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Search Donors
            </Link>
          ) : (
            <button
              onClick={(e) => {
                setIsMenuOpen(false);
                handleUnauthorizedNavClick(e);
              }}
              className="block w-full text-left py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
            >
              Search Donors
            </button>
          )}

          {/* Contact - Mobile */}
          {loggedIn ? (
            <Link
              to="/contact"
              className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          ) : (
            <button
              onClick={(e) => {
                setIsMenuOpen(false);
                handleUnauthorizedNavClick(e);
              }}
              className="block w-full text-left py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
            >
              Contact
            </button>
          )}

          {/* Add Blood Request - Mobile */}
          {loggedIn ? (
            <Link
              to="/blood-request"
              className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Blood Request
            </Link>
          ) : (
            <button
              onClick={(e) => {
                setIsMenuOpen(false);
                handleUnauthorizedNavClick(e);
              }}
              className="block w-full text-left py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
            >
              Add Blood Request
            </button>
          )}

          {loggedIn ? (
            <>
              {role === "Admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              ) : (
                 <Link
                  to="/donor/dashboard"
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Donor Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 hover:bg-red-700 px-3 rounded transition-colors duration-200 hover:pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
