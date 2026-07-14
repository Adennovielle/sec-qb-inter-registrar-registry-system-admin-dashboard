import React, { useState } from "react";
import { PageHeader, Card, StatusBadge } from "../components/UI";
import { transfers } from "../data/mockData";

const filters = ["all", "pending", "review", "approved", "rejected"];

export default function Transfers() {
  const [filter, setFilter] = useState("all");
  const rows = transfers.filter((t) => filter === "all" || t.status === filter);

  return (
    <>
      <PageHeader
        eyebrow="Registry &middot; IRT"
        title="Inter-Registrar Transfers"
        description="Domain custody transfers between accredited registrars on behalf of SEC-qualified buyers."
        action={<button className="btn-irr-primary">+ Initiate Transfer</button>}
      />

      <Card>
        <div className="irr-filter-bar">
          {filters.map((f) => (
            <button
              key={f}
              className={"irr-pill" + (filter === f ? " active" : "")}
              onClick={() => setFilter(f)}
              style={{ textTransform: "capitalize" }}
            >
              {f === "all" ? "All transfers" : f}
            </button>
          ))}
        </div>

        <div className="irr-table-wrap">
          <table className="irr-table">
            <thead>
              <tr>
                <th>Transfer ID</th>
                <th>Qualified Buyer</th>
                <th>From Registrar</th>
                <th>To Registrar</th>
                <th>Requested</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td className="irr-table-id">{t.id}</td>
                  <td style={{ fontWeight: 600 }}>{t.buyer}</td>
                  <td>{t.from}</td>
                  <td>{t.to}</td>
                  <td className="text-mono">{t.requested}</td>
                  <td><StatusBadge status={t.status} /></td>
                  <td><button className="btn-irr-outline">Details</button></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--ink-faint)", padding: "28px 0" }}>
                    No transfers match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
