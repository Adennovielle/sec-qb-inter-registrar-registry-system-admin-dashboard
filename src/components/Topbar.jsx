import React from "react";
import { IconSearch, IconBell, IconMenu } from "./Icons";

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="irr-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
            placeholder="Search buyer ID, registrar, or transfer ID&hellip;"
          />
        </div>
      </div>

      <div className="irr-topbar-right">
        <button className="irr-icon-btn" aria-label="Notifications">
          <IconBell />
          <span className="dot" />
        </button>
        <div className="irr-profile">
          <div className="irr-avatar">JM</div>
          <div className="irr-profile-text">
            <div className="name">J. Marchetti</div>
            <div className="role">Compliance Officer</div>
          </div>
        </div>
      </div>
    </header>
  );
}
