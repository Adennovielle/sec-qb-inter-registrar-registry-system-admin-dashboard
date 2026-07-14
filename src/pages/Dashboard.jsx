import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "../charts/chartSetup";
import { palette } from "../charts/chartSetup";
import { PageHeader, StatCard, Card } from "../components/UI";
import {
  IconSeal,
  IconBuilding,
  IconSwap,
  IconShield,
} from "../components/Icons";
import {
  kpis,
  transferVolume,
  transfersByRegistrar,
  buyerVerificationStatus,
  recentActivity,
} from "../data/mockData";

export default function Dashboard() {
  const lineData = {
    labels: transferVolume.labels,
    datasets: [
      {
        label: "Approved transfers",
        data: transferVolume.approved,
        borderColor: palette.primary,
        backgroundColor: palette.primarySoft,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: palette.primary,
      },
      {
        label: "Rejected transfers",
        data: transferVolume.rejected,
        borderColor: palette.rose,
        backgroundColor: "transparent",
        borderDash: [4, 4],
        tension: 0.35,
        pointRadius: 2.5,
        pointBackgroundColor: palette.rose,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: { legend: { position: "top", align: "end" } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: palette.gridLine }, beginAtZero: true },
    },
  };

  const barData = {
    labels: transfersByRegistrar.labels,
    datasets: [
      {
        label: "Completed transfers (YTD)",
        data: transfersByRegistrar.values,
        backgroundColor: palette.primary,
        borderRadius: 4,
        maxBarThickness: 30,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { autoSkip: false, maxRotation: 28, minRotation: 0 },
      },
      y: { grid: { color: palette.gridLine }, beginAtZero: true },
    },
  };

  const doughnutData = {
    labels: buyerVerificationStatus.labels,
    datasets: [
      {
        data: buyerVerificationStatus.values,
        backgroundColor: [
          palette.primary,
          palette.primaryMid,
          palette.gold,
          palette.rose,
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { padding: 14, font: { size: 11.5 } },
      },
    },
  };

  return (
    <>
      <PageHeader
        eyebrow="IRR &middot; Registry Operations"
        title="Dashboard"
        description="Real-time status of SEC-qualified buyer accreditation and inter-registrar domain transfers."
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6 col-xl-3 ">
          <StatCard
            icon={<IconSeal />}
            label="Qualified Buyers"
            value={kpis.totalQualifiedBuyers.toLocaleString()}
            delta={kpis.qualifiedBuyersDelta}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            icon={<IconBuilding />}
            label="Active Registrars"
            value={kpis.activeRegistrars}
            delta={kpis.activeRegistrarsDelta}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            icon={<IconSwap />}
            label="Pending Transfers"
            value={kpis.pendingTransfers}
            delta={kpis.pendingTransfersDelta}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            icon={<IconShield />}
            label="Compliance Rate"
            value={kpis.complianceRate + "%"}
            delta={kpis.complianceRateDelta}
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-8">
          <Card
            title="Transfer volume"
            subtitle="Approved vs. rejected inter-registrar transfers, monthly"
          >
            <div style={{ height: 300 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </Card>
        </div>
        <div className="col-12 col-xl-4">
          <Card
            title="Buyer verification status"
            subtitle="SEC accreditation pipeline"
          >
            <div style={{ height: 300 }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </Card>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <Card
            title="Transfers by registrar"
            subtitle="Year-to-date completed transfers"
          >
            <div style={{ height: 280 }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </Card>
        </div>
        <div className="col-12 col-xl-5">
          <Card title="Registry activity" subtitle="Most recent ledger events">
            <div>
              {recentActivity.map((item) => (
                <div className="irr-activity-item" key={item.id}>
                  <span className="irr-activity-dot" />
                  <div>
                    <div className="irr-activity-text">{item.text}</div>
                    <div className="irr-activity-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
