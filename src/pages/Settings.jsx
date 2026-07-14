import React, { useState } from "react";
import { PageHeader, Card } from "../components/UI";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage your compliance officer profile and IRR system preferences."
      />

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <Card title="Profile">
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="irr-form-label">Full name</label>
                  <input className="irr-form-control" defaultValue="J. Marchetti" />
                </div>
                <div className="col-md-6">
                  <label className="irr-form-label">Title</label>
                  <input className="irr-form-control" defaultValue="Compliance Officer" />
                </div>
                <div className="col-md-6">
                  <label className="irr-form-label">Work email</label>
                  <input className="irr-form-control" defaultValue="j.marchetti@irr-registry.example" />
                </div>
                <div className="col-md-6">
                  <label className="irr-form-label">Registrar affiliation</label>
                  <select className="irr-form-control">
                    <option>Verisign</option>
                    <option>Identity Digital</option>
                    <option>Public Interest Registry</option>
                    <option>Registry Services LLC</option>
                    <option>GoDaddy Registry</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="irr-form-label">Notes</label>
                  <textarea className="irr-form-control" rows={3} defaultValue="" placeholder="Internal notes visible only to your compliance team." />
                </div>
              </div>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
                <button type="submit" className="btn-irr-primary">Save changes</button>
                {saved && <span style={{ fontSize: 12.5, color: "var(--status-approved)", fontWeight: 600 }}>Saved</span>}
              </div>
            </form>
          </Card>
        </div>

        <div className="col-12 col-lg-5">
          <Card title="Notifications">
            {[
              ["Transfer requires review", true],
              ["Buyer accreditation expiring within 30 days", true],
              ["Registrar compliance score drops below 90%", true],
              ["Weekly registry digest", false],
            ].map(([label, defaultChecked], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: 13.5 }}>{label}</span>
                <div className="form-check form-switch m-0">
                  <input className="form-check-input" type="checkbox" defaultChecked={defaultChecked} style={{ backgroundColor: defaultChecked ? "var(--primary-color)" : "", borderColor: defaultChecked ? "var(--primary-color)" : "" }} />
                </div>
              </div>
            ))}
          </Card>

          <div style={{ marginTop: 16 }}>
            <Card title="Access &amp; security">
              <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 0 }}>
                Two-factor authentication and session controls for this compliance account.
              </p>
              <button className="btn-irr-outline" style={{ width: "100%" }}>Manage security settings</button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
