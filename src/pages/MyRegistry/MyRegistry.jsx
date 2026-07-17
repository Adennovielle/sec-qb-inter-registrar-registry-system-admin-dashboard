import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "../Modals/CreateUser";
import { IoMdAdd } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import { dateFormatter } from "../../utils/dateFormatter";
import "./MyRegistry.css";
import { IoFilterSharp } from "react-icons/io5";
import Toolbar from "./Toolbar";
import { BsChevronBarLeft, BsChevronRight } from "react-icons/bs";

const MyRegistry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [activeTab, setActiveTab] = useState("Central Registry");
  const [usersData, setUsersData] = useState([]);
  const [submissionsData, setSubmissionData] = useState([]);
  const [qualifiedBuyersData, setQualifiedBuyersData] = useState([]);
  const [relyingRegistryData, setRelyingRegistryData] = useState([]);
  const [issuingRegistryData, setIssuingRegistryData] = useState([]);

  const registryTabs = [
    "Central Registry",
    "Issuing Registrar Tab",
    "Relying Registrar Tab",
    "Submissions",
    "Users",
  ];

  const handleRefresh = () => {
    getUsers();
    getSubmissions();
    getQualifiedBuyers();
    getQualifiedBuyersRelyingRegistry();
  };
  useEffect(() => {
    getUsers();
    getSubmissions();
    getQualifiedBuyers();
    getQualifiedBuyersRelyingRegistry();
    getQualifiedBuyersIssuingRegistry();
  }, []);

  const handleExportExcel = () => {
    const exportData = sortedData.map((row) => {
      const obj = {};

      currentRegistry.columns.forEach((col) => {
        obj[col.header] = row[col.accessor] ?? "-";
      });

      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Registry");

    XLSX.writeFile(workbook, `${activeTab}.xlsx`);
  };
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const headers = [currentRegistry.columns.map((col) => col.header)];

    const rows = sortedData.map((row) =>
      currentRegistry.columns.map((col) => row[col.accessor] ?? "-"),
    );

    autoTable(doc, {
      head: headers,
      body: rows,
    });

    doc.save(`${activeTab}.pdf`);
  };
  const handlePrint = () => {
    window.print();
  };

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
  const getQualifiedBuyers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/qualified-buyers/central-registry",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        },
      );

      setQualifiedBuyersData(response.data.qualified_buyers);
    } catch (err) {
      console.error(err);
    }
  };
  const getQualifiedBuyersRelyingRegistry = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/qualified-buyers/relying-registry",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        },
      );

      setRelyingRegistryData(response.data.relying_registry);
    } catch (err) {
      console.error(err);
    }
  };
  const getQualifiedBuyersIssuingRegistry = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/qualified-buyers/issuing-registry",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        },
      );

      setIssuingRegistryData(response.data.issuing_registry);
    } catch (err) {
      console.error(err);
    }
  };
  //------REGISTRY_DATA---------

  const registryConfig = {
    "Central Registry": {
      title: "SEC Central Registry of Qualified Buyers",
      columns: [
        { header: "QBID", accessor: "qbid" },
        { header: "QB Name", accessor: "qb_name" },
        { header: "QB Type", accessor: "qb_type" },
        { header: "Registration Date", accessor: "registration_date" },
        { header: "COR Control Number", accessor: "cor_control_number" },
        { header: "Validity Period", accessor: "validity_period" },
        { header: "QB Status", accessor: "qb_status" },
        { header: "Issuing Registrar", accessor: "issuing_registrar" },
        { header: "Relying Registrar", accessor: "relying_registrar" },
      ],
      data: qualifiedBuyersData,
    },

    "Issuing Registrar Tab": {
      title: "Issuing Registrar Registry",
      columns: [
        { header: "QBID", accessor: "qbid" },
        { header: "QBID Type", accessor: "qb_type" },
        { header: "Registration Date", accessor: "registration_date" },
        { header: "Certificate No.", accessor: "certificate_no" },
        { header: "Validity Period", accessor: "validity_period" },
        { header: "QB Status", accessor: "qb_status" },
        { header: "Issuing Registrar", accessor: "issuing_registrar" },
        {
          header: "Name of Relying Registrar",
          accessor: "relying_registrar",
        },
        {
          header: "Date of Evaluation",
          accessor: "evaluation_date",
        },
        {
          header: "Name of Personnel who conducted the evaluation",
          accessor: "evaluator_name",
        },
        {
          header: "Designation of the Personnel",
          accessor: "evaluator_designation",
        },
      ],
      data: issuingRegistryData,
    },

    "Relying Registrar Tab": {
      title: "Relying Registrar Registry",
      columns: [
        { header: "QBID", accessor: "qbid" },
        {
          header: "Issuing Registrar",
          accessor: "issuing_registrar",
        },
        {
          header: "QB Status",
          accessor: "qb_status",
        },
        {
          header: "Certificate No.",
          accessor: "certificate_no",
        },
        {
          header: "Validity Period",
          accessor: "validity_period",
        },
      ],
      data: relyingRegistryData,
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

  const filteredData = currentRegistry.data.filter((row) =>
    currentRegistry.columns.some((column) =>
      String(row[column.accessor] ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ),
  );

  const sortedData = [...filteredData];

  if (sortOrder === "asc") {
    sortedData.sort((a, b) =>
      String(a[currentRegistry.columns[0].accessor] ?? "").localeCompare(
        String(b[currentRegistry.columns[0].accessor] ?? ""),
      ),
    );
  }

  if (sortOrder === "desc") {
    sortedData.sort((a, b) =>
      String(b[currentRegistry.columns[0].accessor] ?? "").localeCompare(
        String(a[currentRegistry.columns[0].accessor] ?? ""),
      ),
    );
  }

  return (
    <>
      <section id="my-registry">
        <div className="d-flex flex-column">
          {/* Toolbar */}
          <Toolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentRegistry={currentRegistry}
            filteredData={filteredData}
            sortedData={sortedData}
            activeTab={activeTab}
            onRefresh={handleRefresh}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

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
                    {filteredData.length > 0 ? (
                      sortedData.map((row, index) => (
                        <tr key={index}>
                          {currentRegistry.columns.map((column) => (
                            <td
                              key={column.accessor}
                              data-label={column.header}
                            >
                              {column.accessor === "submitted_at"
                                ? dateFormatter(row[column.accessor])
                                : (row[column.accessor] ?? "-")}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={filteredData.length}
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
                <small>Showing {filteredData.length} record(s)</small>

                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <button className="page-link">
                      <BsChevronBarLeft />
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
