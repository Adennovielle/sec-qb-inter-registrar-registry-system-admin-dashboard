import React, { useMemo, useState } from "react";
import { PageHeader, Card, StatusBadge } from "../components/UI";
import { IconUser, IconServer, IconDownload } from "../components/Icons";
import { auditLogs } from "../data/mockData";

const resultFilters = ["all", "success", "flagged", "failure"];
const actorFilters = ["all", "user", "system"];

export default function AuditLog() {
  const [resultFilter, setResultFilter] = useState("all");
  const [actorFilter, setActorFilter] = useState("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return auditLogs.filter((l) => {
      const matchesResult = resultFilter === "all" || l.result === resultFilter;
      const matchesActor = actorFilter === "all" || l.actorType === actorFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        l.actor.toLowerCase().includes(q) ||
        l.entity.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q);
      return matchesResult && matchesActor && matchesQuery;
    });
  }, [resultFilter, actorFilter, query]);

  return (
    <>
      <PageHeader
        eyebrow="Oversight &middot; Audit Trail"
        title="Audit Log"
        description="Chronological, append-only record of registry actions — who did what, to which record, and from where. Retained for SEC examination and internal review."
        action={
          <button className="btn-irr-outline">
            <IconDownload
              style={{
                width: 14,
                height: 14,
                marginRight: 6,
                verticalAlign: -2,
              }}
            />
            Export CSV
          </button>
        }
      />

      <Card>
        {/* <div className="irr-filter-bar">
          {resultFilters.map((f) => (
            <button
              key={f}
              className={"irr-pill" + (resultFilter === f ? " active" : "")}
              onClick={() => setResultFilter(f)}
              style={{ textTransform: "capitalize" }}
            >
              {f === "all" ? "All results" : f}
            </button>
          ))}
          <span
            style={{ width: 1, background: "var(--border)", margin: "0 2px" }}
          />
          {actorFilters.map((f) => (
            <button
              key={f}
              className={"irr-pill" + (actorFilter === f ? " active" : "")}
              onClick={() => setActorFilter(f)}
              style={{ textTransform: "capitalize" }}
            >
              {f === "all"
                ? "All actors"
                : f === "user"
                  ? "User-initiated"
                  : "System-initiated"}
            </button>
          ))}
          <input
            className="irr-form-control"
            style={{ maxWidth: 240, marginLeft: "auto" }}
            placeholder="Search actor, entity, or action"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div> */}

        <div className="irr-table-wrap">
          <table className="irr-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp (UTC)</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Entity</th>
                <th>IP Address</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id}>
                  <td className="irr-table-id">{l.id}</td>
                  <td className="text-mono" style={{ whiteSpace: "nowrap" }}>
                    {l.timestamp}
                  </td>
                  <td>
                    <div className="irr-cell-entity">
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background:
                            l.actorType === "system"
                              ? "var(--seal-gold-tint)"
                              : "var(--primary-tint-10)",
                          color:
                            l.actorType === "system"
                              ? "var(--seal-gold)"
                              : "var(--primary-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {l.actorType === "system" ? (
                          <IconServer style={{ width: 13, height: 13 }} />
                        ) : (
                          <IconUser style={{ width: 13, height: 13 }} />
                        )}
                      </span>
                      <span style={{ fontSize: 13 }}>{l.actor}</span>
                    </div>
                  </td>
                  <td>{l.action}</td>
                  <td>
                    <span className="text-mono" style={{ fontSize: 12.5 }}>
                      {l.entity}
                    </span>
                    <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                      {l.entityType}
                    </div>
                  </td>
                  <td
                    className="text-mono"
                    style={{ fontSize: 12.5, color: "var(--ink-faint)" }}
                  >
                    {l.ip}
                  </td>
                  <td>
                    <StatusBadge status={l.result} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      color: "var(--ink-faint)",
                      padding: "28px 0",
                    }}
                  >
                    No log entries match this filter.
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
