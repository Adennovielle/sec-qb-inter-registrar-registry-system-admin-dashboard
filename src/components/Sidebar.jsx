import React from "react";
import { NavLink } from "react-router-dom";
import {
  IconGrid,
  IconSeal,
  IconBuilding,
  IconSwap,
  IconShield,
  IconSettings,
  IconFile,
  IconUser,
} from "./Icons";

export default function Sidebar({ open }) {
  const navClass = ({ isActive }) =>
    "irr-nav-link" + (isActive ? " active" : "");

  return (
    <aside className={"irr-sidebar" + (open ? " is-open" : "")}>
      <div className="irr-brand">
        <div className="irr-brand-seal">
          <IconSeal />
        </div>
        <div className="irr-brand-text">
          <span className="eyebrow">SEC &middot; Registry Ops</span>
          <span className="name">IRR System</span>
        </div>
      </div>

      <nav className="irr-nav">
        <div className="irr-nav-section-label">Overview</div>
        <NavLink to="/" end className={navClass}>
          <IconGrid /> Dashboard
        </NavLink>

        <div className="irr-nav-section-label">Registry</div>
        <NavLink to="/qualified-buyers" className={navClass}>
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
        <NavLink to="/audit-log" className={navClass}>
          <IconUser /> Users
        </NavLink>
        <NavLink to="/settings" className={navClass}>
          <IconSettings /> Settings
        </NavLink>
      </nav>

      <div className="irr-sidebar-footer">
        IRR-SYS v2.4.1
        <br />
        17 CFR &sect; 230.501 reference build
      </div>
    </aside>
  );
}
