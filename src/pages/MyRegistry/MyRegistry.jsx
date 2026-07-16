import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "../Modals/CreateUser";
// import { Link } from "react-router-dom";
import {
  BsArrowClockwise,
  BsSearch,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiLink } from "react-icons/ci";
import { dateFormatter } from "../../helpers/dateFormatter";
import "./MyRegistry.css";

const MyRegistry = () => {
  const [activeTab, setActiveTab] = useState("Central Registry");
  const [usersData, setUsersData] = useState([]);
  const [submissionsData, setSubmissionData] = useState([]);

  const registryTabs = [
    "Central Registry",
    "Issuing Registrar Tab",
    "Relying Registrar Tab",
    "Submissions",
    "Users",
  ];

  useEffect(() => {
    getUsers();
    getSubmissions();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/users", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      setUsersData(response.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubmissions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/submissions", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      setSubmissionData(response.data.submissions);
    } catch (err) {
      console.error(err);
    }
  };
  //------REGISTRY_DATA---------
  const issuingRegistrarData = [
    {
      id: 1,
      qbid: "MET-IND-24-6gH5vcQ7",
      qbIdType: "Individual",
      registrationDate: "17-May-2024",
      certicateNo: "3034473952",
      validityPeriod: "17-May-2027",
      qbStatus: "ACTIVE",
      issuingRegistrar: "METROPOLITAN SAMPLE ONLY",
      nameOfRelyingRegistrar: "PHILIPPINE SAMPLE ONLY",
      dateOfEvaluation: "17-May-2024",
      nameOfPersonnelConductedEval: "Juan Dela Cruz",
      designationOfPersonnel: "Compliance Officer",
    },
  ];
  const centralRegistryData = [
    {
      id: 1,
      qbid: "MET-IND-24-6gH5vcQ7",
      qbName: "Individual",
      qbType: "17-May-2024",
      registrationDate: "3034473952",
      corControlNumber: "17-May-2027",
      validityPeriod: "ACTIVE",
      qbStatus: "METROPOLITAN SAMPLE ONLY",
      issuingRegistrar: "PHILIPPINE SAMPLE ONLY",
      relyingRegistrar: "17-May-2024",
    },
  ];

  const relyingRegistrarData = [
    {
      id: 1,
      qbid: "MET-IND-24-6gH5vcQ7",
      issuingRegistrar: "roar",
      qbStatus: "Active",
      certificateNo: "3034473952",
      validityPeriod: "17-May-2024",
    },
  ];

  // ---------END OF REGISTRY DATA-----------
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
          accessor: "submitted_at",
        },
        {
          header: "Submission Reference No.",
          accessor: "submission_reference_no",
        },
        {
          header: "Registrar Name",
          accessor: "registrar_name",
        },
        {
          header: "Submission Type",
          accessor: "submission_type",
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
          accessor: "registrar_id",
        },
        {
          header: "Registrar Name",
          accessor: "registrar_name",
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
    <>
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
              <div className="p-3 bg-warning-subtle fw-semibold text-warning-emphasis d-flex justify-content-between align-items-center">
                {currentRegistry.title}
                <button
                  type="button"
                  className="btn btn-success d-inline-flex align-items-center gap-1"
                  data-bs-toggle="modal"
                  data-bs-target="#createUserModal"
                >
                  <span>Create User</span>
                  <IoMdAdd className="fs-5" />
                </button>
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
                            // <td
                            //   key={column.accessor}
                            //   data-label={column.header}
                            // >
                            //   {row[column.accessor]}
                            // </td>
                            <td
                              key={column.accessor}
                              data-label={column.header}
                            >
                              {column.accessor === "submitted_at"
                                ? dateFormatter(row[column.accessor])
                                : row[column.accessor]}
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

      {/* Create User Modal */}
      <div
        className="modal fade"
        id="createUserModal"
        tabIndex="-1"
        aria-labelledby="createUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="createUserModalLabel">
                Create User
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <CreateUser />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRegistry;
