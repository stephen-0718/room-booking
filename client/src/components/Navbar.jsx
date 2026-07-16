import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          🏨 Hotel Booking
        </div>

        <div className="desktop-menu">
          <Link to="/">Hotels</Link>

          <Link to="/rooms">
            Rooms
          </Link>

          {token && (
            <>
              <Link to="/my-bookings">
                My Bookings
              </Link>

              <Link to="/dashboard">
                Dashboard
              </Link>
            </>
          )}

          {role === "admin" && (
            <Link to="/admin">
              Admin
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link
                className="register-btn"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>

        <button
          className="hamburger"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/">
            Hotels
          </Link>

          <Link to="/rooms">
            Rooms
          </Link>

          {token && (
            <>
              <Link to="/my-bookings">
                My Bookings
              </Link>

              <Link to="/dashboard">
                Dashboard
              </Link>
            </>
          )}

          {role === "admin" && (
            <Link to="/admin">
              Admin
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;