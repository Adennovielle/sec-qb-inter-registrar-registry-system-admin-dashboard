// Mock data layer for the IRR system.
// In production these would be replaced by axios calls into `src/api/client.js`.

export const kpis = {
  totalQualifiedBuyers: 1842,
  qualifiedBuyersDelta: 4.6,
  activeRegistrars: 63,
  activeRegistrarsDelta: 1.2,
  pendingTransfers: 27,
  pendingTransfersDelta: -8.3,
  complianceRate: 98.4,
  complianceRateDelta: 0.3,
};

export const transferVolume = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  approved: [142, 158, 149, 171, 186, 193, 204],
  rejected: [9, 12, 7, 11, 8, 6, 5],
};

export const transfersByRegistrar = {
  labels: ["Verisign", "Registry Services LLC", "Public Interest Registry", "Identity Digital", "GoDaddy Registry", "Others"],
  values: [312, 198, 176, 154, 121, 209],
};

export const buyerVerificationStatus = {
  labels: ["Verified — Accredited Investor", "Verified — Qualified Institutional", "Pending Review", "Documentation Requested"],
  values: [612, 498, 214, 96],
};

export const recentActivity = [
  { id: 1, text: "Qualified buyer QB-10482 (Meridian Capital Partners) completed SEC Rule 501 accreditation review.", time: "8 min ago" },
  { id: 2, text: "Inter-registrar transfer IRT-88213 approved: verisign-grs \u2192 identity-digital.", time: "34 min ago" },
  { id: 3, text: "Registrar Public Interest Registry submitted quarterly compliance attestation.", time: "1 hr ago" },
  { id: 4, text: "Transfer IRT-88190 flagged for manual review \u2014 buyer accreditation expiring within 30 days.", time: "2 hr ago" },
  { id: 5, text: "Qualified buyer QB-10475 (Nordhaven Family Office) documentation set to expire in 14 days.", time: "3 hr ago" },
  { id: 6, text: "Registrar GoDaddy Registry Services onboarded to IRR reporting API v2.", time: "5 hr ago" },
];

export const qualifiedBuyers = [
  { id: "QB-10482", name: "Meridian Capital Partners", type: "Qualified Institutional Buyer", registrar: "Verisign", status: "approved", verifiedOn: "2026-06-28", holdings: 214 },
  { id: "QB-10479", name: "Halden & Cross Trust", type: "Accredited Investor", registrar: "Identity Digital", status: "approved", verifiedOn: "2026-06-22", holdings: 62 },
  { id: "QB-10475", name: "Nordhaven Family Office", type: "Accredited Investor", registrar: "Public Interest Registry", status: "review", verifiedOn: "2026-06-19", holdings: 118 },
  { id: "QB-10468", name: "Silvercreek Ventures LLC", type: "Qualified Institutional Buyer", registrar: "Registry Services LLC", status: "approved", verifiedOn: "2026-06-14", holdings: 340 },
  { id: "QB-10461", name: "Aurum Digital Holdings", type: "Accredited Investor", registrar: "GoDaddy Registry", status: "pending", verifiedOn: "\u2014", holdings: 0 },
  { id: "QB-10457", name: "Blackwell Municipal Fund", type: "Qualified Institutional Buyer", registrar: "Verisign", status: "approved", verifiedOn: "2026-06-09", holdings: 87 },
  { id: "QB-10450", name: "Castellane Partners", type: "Accredited Investor", registrar: "Identity Digital", status: "rejected", verifiedOn: "2026-06-04", holdings: 0 },
  { id: "QB-10444", name: "Thornbury Endowment Trust", type: "Qualified Institutional Buyer", registrar: "Public Interest Registry", status: "approved", verifiedOn: "2026-05-30", holdings: 156 },
];

export const registrars = [
  { id: "IANA-292", name: "Verisign", iana: "292", status: "active", buyers: 612, complianceScore: 99.1 },
  { id: "IANA-1454", name: "Identity Digital", iana: "1454", status: "active", buyers: 388, complianceScore: 97.8 },
  { id: "IANA-134", name: "Public Interest Registry", iana: "134", status: "active", buyers: 341, complianceScore: 98.6 },
  { id: "IANA-895", name: "Registry Services LLC", iana: "895", status: "review", buyers: 279, complianceScore: 92.4 },
  { id: "IANA-146", name: "GoDaddy Registry", iana: "146", status: "active", buyers: 222, complianceScore: 96.9 },
  { id: "IANA-303", name: "Sentinel Names Registry", iana: "303", status: "suspended", buyers: 0, complianceScore: 61.2 },
];

export const transfers = [
  { id: "IRT-88221", buyer: "Meridian Capital Partners", from: "Registry Services LLC", to: "Verisign", status: "pending", requested: "2026-07-09" },
  { id: "IRT-88213", buyer: "Silvercreek Ventures LLC", from: "Verisign", to: "Identity Digital", status: "approved", requested: "2026-07-08" },
  { id: "IRT-88204", buyer: "Halden & Cross Trust", from: "GoDaddy Registry", to: "Public Interest Registry", status: "approved", requested: "2026-07-07" },
  { id: "IRT-88198", buyer: "Blackwell Municipal Fund", from: "Identity Digital", to: "Verisign", status: "review", requested: "2026-07-06" },
  { id: "IRT-88190", buyer: "Nordhaven Family Office", from: "Public Interest Registry", to: "Registry Services LLC", status: "review", requested: "2026-07-05" },
  { id: "IRT-88176", buyer: "Castellane Partners", from: "Verisign", to: "GoDaddy Registry", status: "rejected", requested: "2026-07-02" },
  { id: "IRT-88161", buyer: "Thornbury Endowment Trust", from: "Identity Digital", to: "Public Interest Registry", status: "approved", requested: "2026-06-29" },
];

export const auditLogs = [
  { id: "AL-902341", timestamp: "2026-07-10 08:12:04", actor: "j.marchetti@irr-registry.example", actorType: "user", action: "Approved", entity: "IRT-88213", entityType: "Transfer", ip: "10.44.2.108", result: "success" },
  { id: "AL-902340", timestamp: "2026-07-10 07:58:41", actor: "IRR-SYS Automated Review", actorType: "system", action: "Flagged for review", entity: "IRT-88190", entityType: "Transfer", ip: "internal", result: "flagged" },
  { id: "AL-902339", timestamp: "2026-07-10 07:41:19", actor: "s.oduya@irr-registry.example", actorType: "user", action: "Verified accreditation", entity: "QB-10482", entityType: "Qualified Buyer", ip: "10.44.2.61", result: "success" },
  { id: "AL-902338", timestamp: "2026-07-10 06:55:02", actor: "IRR-SYS Automated Review", actorType: "system", action: "Sent expiration notice", entity: "QB-10475", entityType: "Qualified Buyer", ip: "internal", result: "success" },
  { id: "AL-902337", timestamp: "2026-07-09 22:14:37", actor: "r.dalisay@irr-registry.example", actorType: "user", action: "Filed compliance attestation", entity: "CR-2026-Q2-03", entityType: "Compliance Report", ip: "10.44.3.19", result: "success" },
  { id: "AL-902336", timestamp: "2026-07-09 19:02:55", actor: "unknown", actorType: "user", action: "Failed login attempt", entity: "\u2014", entityType: "Session", ip: "203.0.113.44", result: "failure" },
  { id: "AL-902335", timestamp: "2026-07-09 17:30:12", actor: "j.marchetti@irr-registry.example", actorType: "user", action: "Rejected", entity: "QB-10450", entityType: "Qualified Buyer", ip: "10.44.2.108", result: "failure" },
  { id: "AL-902334", timestamp: "2026-07-09 15:47:29", actor: "IRR-SYS Automated Review", actorType: "system", action: "Suspended registrar", entity: "IANA-303", entityType: "Registrar", ip: "internal", result: "flagged" },
  { id: "AL-902333", timestamp: "2026-07-09 13:20:08", actor: "s.oduya@irr-registry.example", actorType: "user", action: "Initiated transfer", entity: "IRT-88221", entityType: "Transfer", ip: "10.44.2.61", result: "success" },
  { id: "AL-902332", timestamp: "2026-07-09 11:05:44", actor: "r.dalisay@irr-registry.example", actorType: "user", action: "Updated buyer record", entity: "QB-10461", entityType: "Qualified Buyer", ip: "10.44.3.19", result: "success" },
];

export const complianceReports = [
  { id: "CR-2026-Q2-01", registrar: "Verisign", period: "Q2 2026", score: 99.1, status: "approved", filedOn: "2026-07-01" },
  { id: "CR-2026-Q2-02", registrar: "Identity Digital", period: "Q2 2026", score: 97.8, status: "approved", filedOn: "2026-07-01" },
  { id: "CR-2026-Q2-03", registrar: "Registry Services LLC", period: "Q2 2026", score: 92.4, status: "review", filedOn: "2026-07-02" },
  { id: "CR-2026-Q2-04", registrar: "Public Interest Registry", period: "Q2 2026", score: 98.6, status: "approved", filedOn: "2026-06-30" },
  { id: "CR-2026-Q2-05", registrar: "GoDaddy Registry", period: "Q2 2026", score: 96.9, status: "approved", filedOn: "2026-06-30" },
  { id: "CR-2026-Q2-06", registrar: "Sentinel Names Registry", period: "Q2 2026", score: 61.2, status: "rejected", filedOn: "2026-06-28" },
];
