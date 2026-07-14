import React from "react";
import { PageHeader, Card, StatusBadge } from "../components/UI";
import { registrars } from "../data/mockData";

export default function Registrars() {
  return (
    <>
      <PageHeader
        eyebrow="Registry &middot; Registrars"
        title="Registrars"
        description="ICANN-accredited registrars participating in the Inter-Registrar Registry reporting network."
        action={<button className="btn-irr-primary">+ Onboard Registrar</button>}
      />

      <div className="row g-3">
        {registrars.map((r) => (
          <div className="col-12 col-md-6 col-xl-4" key={r.id}>
            <div className="irr-card" style={{ padding: 20, height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16 }}>{r.name}</div>
                  <div className="text-mono" style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 2 }}>
                    IANA ID {r.iana}
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>

              <div style={{ display: "flex", gap: 22, marginTop: 18 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                    Qualified Buyers
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600 }}>{r.buyers}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                    Compliance Score
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 600,
                      color: r.complianceScore >= 95 ? "var(--status-approved)" : r.complianceScore >= 80 ? "var(--status-pending)" : "var(--status-rejected)",
                    }}
                  >
                    {r.complianceScore}%
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, height: 6, borderRadius: 4, background: "var(--surface-sunken)", overflow: "hidden" }}>
                <div
                  style={{
                    width: r.complianceScore + "%",
                    height: "100%",
                    background: r.complianceScore >= 95 ? "var(--status-approved)" : r.complianceScore >= 80 ? "var(--status-pending)" : "var(--status-rejected)",
                  }}
                />
              </div>

              <button className="btn-irr-outline" style={{ marginTop: 18, width: "100%" }}>
                View registrar file
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
