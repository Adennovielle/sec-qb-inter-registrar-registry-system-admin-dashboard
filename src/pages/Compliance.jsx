import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../charts/chartSetup";
import { palette } from "../charts/chartSetup";
import { PageHeader, Card, StatusBadge } from "../components/UI";
import { complianceReports } from "../data/mockData";

export default function Compliance() {
  const avgScore = (
    complianceReports.reduce((sum, r) => sum + r.score, 0) / complianceReports.length
  ).toFixed(1);

  const ringData = {
    labels: ["Compliant", "Remaining"],
    datasets: [
      {
        data: [avgScore, 100 - avgScore],
        backgroundColor: [palette.primary, "#eef1ee"],
        borderWidth: 0,
      },
    ],
  };

  const ringOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "78%",
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <>
      <PageHeader
        eyebrow="Oversight &middot; Compliance"
        title="Compliance"
        description="Quarterly attestations filed by registrars under the Inter-Registrar Registry reporting mandate."
        action={<button className="btn-irr-primary">File New Report</button>}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-4">
          <Card title="Network compliance score" subtitle="Weighted average, current quarter">
            <div className="irr-ring-wrap">
              <div style={{ width: 130, height: 130, position: "relative", flexShrink: 0 }}>
                <Doughnut data={ringData} options={ringOptions} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="irr-ring-value">{avgScore}%</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: 0 }}>
                  Calculated across {complianceReports.length} registrar attestations filed for Q2 2026 under the
                  IRR reporting mandate.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-lg-8">
          <Card title="Filing status" subtitle="Q2 2026 attestation cycle">
            <div className="row g-3">
              {["approved", "review", "rejected"].map((status) => {
                const count = complianceReports.filter((r) => r.status === status).length;
                return (
                  <div className="col-4" key={status}>
                    <div style={{ textAlign: "center", padding: "14px 8px", border: "1px solid var(--border)", borderRadius: 10 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600 }}>{count}</div>
                      <StatusBadge status={status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      <Card title="Attestation reports">
        <div className="irr-table-wrap">
          <table className="irr-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Registrar</th>
                <th>Period</th>
                <th>Score</th>
                <th>Status</th>
                <th>Filed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {complianceReports.map((r) => (
                <tr key={r.id}>
                  <td className="irr-table-id">{r.id}</td>
                  <td style={{ fontWeight: 600 }}>{r.registrar}</td>
                  <td>{r.period}</td>
                  <td className="text-mono">{r.score}%</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td className="text-mono">{r.filedOn}</td>
                  <td><button className="btn-irr-outline">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
