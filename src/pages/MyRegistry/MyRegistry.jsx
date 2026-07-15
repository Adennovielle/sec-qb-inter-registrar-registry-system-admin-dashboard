import React, { useState } from "react";
import {
  BsArrowClockwise,
  BsSearch,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./MyRegistry.css";
import {
  issuingRegistrarData,
  centralRegistryData,
  relyingRegistrarData,
  usersData,
  submissionsData,
} from "./myRegistryData";

const MyRegistry = () => {
  const [activeTab, setActiveTab] = useState("Central Registry");

  const registryTabs = [
    "Central Registry",
    "Issuing Registrar Tab",
    "Relying Registrar Tab",
    "Submissions",
    "Users",
  ];

  const registryConfig = {
    "Central Registry": {
      title: "SEC Central Registry of Qualified Buyers",
      columns: [
        { header: "QBID", accessor: "qbid" },
        { header: "QB Name", accessor: "qbName" },
        { header: "QB Type", accessor: "qbType" },
        { header: "Registration Date", accessor: "registrationDate" },
        { header: "COR Control Number", accessor: "corControlNumber" },
        { header: "Validity Period", accessor: "validityPeriod" },
        { header: "QB Status", accessor: "qbStatus" },
        { header: "Issuing Registrar", accessor: "issuingRegistrar" },
        {
          header: "Relying Registrar",
          accessor: "relyingRegistrar",
        },
      ],
      data: centralRegistryData,
    },

    "Issuing Registrar Tab": {
      title: "Issuing Registrar Registry",
      columns: [
        { header: "QBID", accessor: "qbid" },
        { header: "QBID Type", accessor: "qbIdType" },
        { header: "Registration Date", accessor: "registrationDate" },
        { header: "Certificate No.", accessor: "certicateNo" },
        { header: "Validity Period", accessor: "validityPeriod" },
        { header: "QB Status", accessor: "qbStatus" },
        { header: "Issuing Registrar", accessor: "issuingRegistrar" },
        {
          header: "Name of Relying Registrar",
          accessor: "nameOfRelyingRegistrar",
        },
        {
          header: "Date of Evaluation",
          accessor: "dateOfEvaluation",
        },
        {
          header: "Name of Personnel who conducted the evaluation",
          accessor: "nameOfPersonnelConductedEval",
        },
        {
          header: "Designation of the Personnel",
          accessor: "designationOfPersonnel",
        },
      ],
      data: issuingRegistrarData,
    },

    "Relying Registrar Tab": {
      title: "Relying Registrar Registry",
      columns: [
        { header: "QBID", accessor: "qbid" },
        {
          header: "Issuing Registrar",
          accessor: "issuingRegistrar",
        },
        {
          header: "QB Status",
          accessor: "qbStatus",
        },
        {
          header: "Certificate No.",
          accessor: "certificateNo",
        },
        {
          header: "Validity Period",
          accessor: "validityPeriod",
        },
      ],
      data: relyingRegistrarData,
    },

    Submissions: {
      title: "Submission History",
      columns: [
        {
          header: "Timestamp",
          accessor: "timestamp",
        },
        {
          header: "Submission Reference No.",
          accessor: "submissionRefNo",
        },
        {
          header: "Registrar Name",
          accessor: "registrarName",
        },
        {
          header: "Doc Type",
          accessor: "docType",
        },
        {
          header: "File URL",
          accessor: "fileUrl",
        },
      ],
      data: submissionsData,
    },

    Users: {
      title: "User Accounts",
      columns: [
        {
          header: "Username",
          accessor: "username",
        },
        {
          header: "Password",
          accessor: "password",
        },
        {
          header: "Email",
          accessor: "email",
        },
        {
          header: "Registrar ID",
          accessor: "registrarId",
        },

        {
          header: "Registrar Name",
          accessor: "registrarName",
        },
        {
          header: "Role",
          accessor: "role",
        },
      ],
      data: usersData,
    },
  };

  const currentRegistry = registryConfig[activeTab];

  return (
    <section id="my-registry">
      <div className="d-flex flex-column">
        {/* Toolbar */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="mb-4 ">
              <button className="btn btn-secondary me-2 ps-4 pe-4 pt-2 pb-2">
                Issuing Tab
              </button>
              <button className="btn btn-success ps-4 pe-4 pt-2 pb-2">
                Relying Tab
              </button>
            </div>
            <div className="d-flex mb-3 flex-col ">
              <button className="btn btn-light d-flex align-items-center me-2 gap-2">
                <IoFilterSharp />
                Filters
                <MdOutlineKeyboardArrowDown />
              </button>

              <button className="btn btn-light d-flex align-items-center gap-2">
                <CiExport />
                Export
              </button>

              <div
                className="input-group ms-auto me-2"
                style={{ maxWidth: 500 }}
              >
                <span className="input-group-text">
                  <BsSearch />
                </span>

                <input className="form-control" placeholder="Search..." />
              </div>

              <button className="btn btn-success d-flex align-items-center gap-2">
                <BsArrowClockwise />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="p-3 bg-warning-subtle fw-semibold text-warning-emphasis">
              {currentRegistry.title}
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 irr-table">
                <thead className="table-success">
                  <tr>
                    {currentRegistry.columns.map((column) => (
                      <th key={column.accessor}>{column.header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {currentRegistry.data.length > 0 ? (
                    currentRegistry.data.map((row, index) => (
                      <tr key={index}>
                        {currentRegistry.columns.map((column) => (
                          <td key={column.accessor} data-label={column.header}>
                            {row[column.accessor]}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={currentRegistry.columns.length}
                        className="text-center py-5"
                      >
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Tabs */}
            <div className="border-top">
              <ul className="nav nav-tabs">
                {registryTabs.map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${
                        activeTab === tab ? "active fw-semibold" : ""
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-between align-items-center p-3">
              <small>Showing {currentRegistry.data.length} record(s)</small>

              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <button className="page-link">
                    <BsChevronLeft />
                  </button>
                </li>

                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>

                <li className="page-item disabled">
                  <button className="page-link">
                    <BsChevronRight />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyRegistry;
