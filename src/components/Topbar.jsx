import React from "react";
import { IconSearch, IconBell, IconMenu } from "./Icons";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

export default function Topbar({ onToggleSidebar }) {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ ...authState, status: false });
    navigate("/login");
  };
  return (
    <header className="irr-topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="irr-icon-btn irr-mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <IconMenu />
        </button>

        <div className="irr-search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search buyer ID, registrar, or transfer ID..."
          />
        </div>
      </div>

      <div className="irr-topbar-right">
        <button
          className="irr-icon-btn position-relative"
          aria-label="Notifications"
        >
          <IconBell />
          <span className="dot" />
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown">
          <button
            className="btn p-0 border-0 bg-transparent dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="irr-profile">
              <div className="irr-avatar">JM</div>

              <div className="irr-profile-text text-start">
                <div className="name">{authState.username || "-"}</div>
                <div className="role">Admin</div>
              </div>
            </div>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li>
              <h6 className="dropdown-header">
                Signed in as
                <br />
                <strong> {authState.username}</strong>
              </h6>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <button
                className="dropdown-item d-flex align-items-center"
                onClick={logout}
              >
                <FaSignOutAlt className="me-2 text-danger" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
