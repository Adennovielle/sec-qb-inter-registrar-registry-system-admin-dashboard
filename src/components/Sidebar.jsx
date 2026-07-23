import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SecLogo from "../../public/favicon.png";
import { AuthContext } from "../helpers/AuthContext";
import {
  IconGrid,
  IconSeal,
  IconBuilding,
  IconSwap,
  IconShield,
  IconSettings,
  IconFile,
  IconUser,
  IconMyRegistry,
  IconSubmissionPortal,
  IconSearchQualifiedBuyer,
} from "./Icons";

export default function Sidebar({ open }) {
  const { authState, setAuthState } = useContext(AuthContext);

  const navClass = ({ isActive }) =>
    "irr-nav-link" + (isActive ? " active" : "");

  return (
    <aside className={"irr-sidebar" + (open ? " is-open" : "")}>
      <div className="irr-brand ">
        <div className="irr-brand-seal ">
          {/* <IconSeal /> */}
          <img src={SecLogo} alt="sec-logo" style={{ width: "70%" }} />
        </div>
        <div className="irr-brand-text">
          <span className="eyebrow">SEC &middot; Registry</span>
          <span className="name">IRR System</span>
        </div>
      </div>

      {/* <div className="irr-nav-section-label">Overview</div> */}
      {/* <NavLink to="/" end className={navClass}>
        <IconGrid /> Dashboard
        </NavLink> */}
      <nav className="irr-nav">
        <div className="irr-nav-section-label">Registry</div>

        <NavLink to="/qbid-search" className={navClass}>
          <IconSearchQualifiedBuyer /> QBID Search
        </NavLink>

        <NavLink to="/submission-docs-portal" className={navClass}>
          <IconSubmissionPortal /> Submission Portal
        </NavLink>

        <NavLink to="/my-registry" className={navClass}>
          <IconMyRegistry /> My Registry
        </NavLink>

        {authState.role === "admin" && (
          <NavLink to="/users" className={navClass}>
            <IconUser /> Users
          </NavLink>
        )}
      </nav>
      {/* <NavLink to="/qualified-buyers" className={navClass}>
          <IconSeal /> Qualified Buyers
        </NavLink>
        <NavLink to="/registrars" className={navClass}>
          <IconBuilding /> Registrars
        </NavLink>
        <NavLink to="/transfers" className={navClass}>
          <IconSwap /> Inter-Registrar Transfers
        </NavLink>

        <div className="irr-nav-section-label">Oversight</div>
        <NavLink to="/compliance" className={navClass}>
          <IconShield /> Compliance
        </NavLink>
        <NavLink to="/audit-log" className={navClass}>
          <IconFile /> Audit Log
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          <IconSettings /> Settings
        </NavLink> */}

      <div className="irr-sidebar-footer">
        IRR-SYS 2026
        <br />
        Copyright &copy; 2026-2027 Sample Company All rights reserved.
      </div>
    </aside>
  );
}
