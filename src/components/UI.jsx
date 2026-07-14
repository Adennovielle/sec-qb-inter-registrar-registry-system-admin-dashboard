import React from "react";
import { IconArrowUp, IconArrowDown, IconCheck, IconSeal } from "./Icons";

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="irr-page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ icon, label, value, delta, deltaLabel = "vs. prior period" }) {
  const isUp = delta >= 0;
  return (
    <div className="irr-stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {delta !== undefined && (
        <div className={"stat-delta " + (isUp ? "up" : "down")}>
          {isUp ? <IconArrowUp /> : <IconArrowDown />}
          {Math.abs(delta)}% {deltaLabel}
        </div>
      )}
    </div>
  );
}

const statusLabels = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
  review: "In Review",
  active: "Active",
  suspended: "Suspended",
  success: "Success",
  failure: "Failure",
  flagged: "Flagged",
};

export function StatusBadge({ status }) {
  const cls =
    status === "active" || status === "success"
      ? "approved"
      : status === "suspended" || status === "failure"
      ? "rejected"
      : status === "flagged"
      ? "pending"
      : status;
  return <span className={"irr-badge " + cls}>{statusLabels[status] || status}</span>;
}

export function SealMark({ verified = true }) {
  return (
    <span className={"irr-seal-mark" + (verified ? "" : " unverified")} title={verified ? "Verified" : "Unverified"}>
      {verified ? <IconCheck /> : <IconSeal />}
    </span>
  );
}

export function Card({ title, subtitle, action, children }) {
  return (
    <div className="irr-card">
      {(title || action) && (
        <div className="irr-card-header">
          <div>
            <h2>{title}</h2>
            {subtitle && <div className="subtitle">{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      <div className="irr-card-body">{children}</div>
    </div>
  );
}
