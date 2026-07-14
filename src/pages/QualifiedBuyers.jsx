import React, { useMemo, useState } from "react";
import { PageHeader, Card, StatusBadge, SealMark } from "../components/UI";
import { qualifiedBuyers } from "../data/mockData";

const filters = ["all", "approved", "review", "pending", "rejected"];

export default function QualifiedBuyers() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return qualifiedBuyers.filter((b) => {
      const matchesFilter = filter === "all" || b.status === filter;
      const matchesQuery =
        query.trim() === "" ||
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.id.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <>
      <PageHeader
        eyebrow="Registry &middot; Buyers"
        title="Qualified Buyers"
        description="Buyers accredited under SEC Rule 501 / Rule 144A, eligible to hold domain assets across participating registrars."
        action={<button className="btn-irr-primary">+ New Buyer Record</button>}
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
              {f === "all" ? "All buyers" : f}
            </button>
          ))}
          <input
            className="irr-form-control"
            style={{ maxWidth: 240, marginLeft: "auto" }}
            placeholder="Search by name or buyer ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="irr-table-wrap">
          <table className="irr-table">
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Accreditation Type</th>
                <th>Registrar of Record</th>
                <th>Status</th>
                <th>Verified On</th>
                <th>Holdings</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className="irr-cell-entity">
                      <SealMark verified={b.status === "approved"} />
                      <div className="meta">
                        <div className="primary">{b.name}</div>
                        <div className="secondary irr-table-id">{b.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{b.type}</td>
                  <td>{b.registrar}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td className="text-mono">{b.verifiedOn}</td>
                  <td className="text-mono">{b.holdings}</td>
                  <td><button className="btn-irr-outline">Review</button></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--ink-faint)", padding: "28px 0" }}>
                    No buyer records match this filter.
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
