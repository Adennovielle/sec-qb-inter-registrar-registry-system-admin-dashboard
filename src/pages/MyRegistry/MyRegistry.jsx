import React, { useState, useEffect, useContext } from "react";
import { CiLink } from "react-icons/ci";
import { dateFormatter } from "../../utils/dateFormatter";
import { formatQBName } from "../../utils/fomatQbName";
import "./MyRegistry.css";
import MyRegistryToolbar from "../../components/MyRegistryToolbar";
import { BsChevronBarLeft, BsChevronRight } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../helpers/AuthContext";
import DeleteRegistryModal from "../Modals/DeleteRegistryModal";
import axios from "axios";
import { Modal } from "bootstrap";
import {
  getSubmissions,
  getCentralRegistry,
  getRelyingRegistry,
  getIssuingRegistry,
} from "../../services/myRegistryService";
import EditRegistryModal from "../Modals/EditRegistryModal";

const MyRegistry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [activeTab, setActiveTab] = useState("Central Registry");
  const [submissionsData, setSubmissionData] = useState([]);
  const [qualifiedBuyersData, setQualifiedBuyersData] = useState([]);
  const [relyingRegistryData, setRelyingRegistryData] = useState([]);
  const [issuingRegistryData, setIssuingRegistryData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { authState } = useContext(AuthContext);
  const [editConfig, setEditConfig] = useState({
    item: null,
    title: "",
    type: "",
  });
  const [deleteConfig, setDeleteConfig] = useState({
    item: null,
    action: null,
    title: "",
  });
  const registryTabs =
    authState.role === "admin"
      ? [
          "Central Registry",
          "Issuing Registrar Tab",
          "Relying Registrar Tab",
          "Submissions",
        ]
      : ["Submissions"];

  const fetchRegistryData = async () => {
    try {
      const [submissions, centralRegistry, relyingRegistry, issuingRegistry] =
        await Promise.all([
          getSubmissions(authState.role),
          getCentralRegistry(),
          getRelyingRegistry(),
          getIssuingRegistry(),
        ]);

      setSubmissionData(submissions);
      setQualifiedBuyersData(centralRegistry);
      setRelyingRegistryData(relyingRegistry);
      setIssuingRegistryData(issuingRegistry);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (row) => {
    switch (activeTab) {
      case "Central Registry":
        setEditConfig({
          item: row,
          title: "Qualified Buyer",
          type: "qualifiedBuyer",
        });
        break;

      case "Issuing Registrar Tab":
        setEditConfig({
          item: row,
          title: "Issuing Registry Record",
          type: "issuingRegistry",
        });
        break;

      case "Relying Registrar Tab":
        setEditConfig({
          item: row,
          title: "Relying Registry Record",
          type: "relyingRegistry",
        });
        break;

      case "Submissions":
        setEditConfig({
          item: row,
          title: "Submission",
          type: "submission",
        });
        break;

      default:
        break;
    }
  };
  const closeDeleteModal = () => {
    const modalElement = document.getElementById("deleteRegistryModal");

    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
  };
  const closeEditModal = () => {
    const modalElement = document.getElementById("editRegistryModal");

    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }

    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
  };
  const deleteQB = async (qbid) => {
    try {
      setDeleteLoading(true);

      await axios.delete(`http://localhost:8080/qualified-buyers/${qbid}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      closeDeleteModal();
      await fetchRegistryData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const deleteIssuingRegistry = async (id) => {
    try {
      setDeleteLoading(true);

      await axios.delete(`http://localhost:8080/issuing-registry/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      closeDeleteModal();
      await fetchRegistryData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const deleteRelyingRegistry = async (id) => {
    try {
      setDeleteLoading(true);

      await axios.delete(`http://localhost:8080/relying-registry/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      closeDeleteModal();
      await fetchRegistryData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const deleteSubmission = async (id) => {
    try {
      setDeleteLoading(true);

      await axios.delete(`http://localhost:8080/submissions/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      closeDeleteModal();
      await fetchRegistryData();
    } catch (err) {
      console.error(err);
      throw err; // <-- idagdag ito
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteClick = (row) => {
    switch (activeTab) {
      case "Central Registry":
        setDeleteConfig({
          item: row,
          action: () => deleteQB(row.qbid),
          title: "Qualified Buyer",
        });
        break;

      case "Issuing Registrar Tab":
        setDeleteConfig({
          item: row,
          action: () => deleteIssuingRegistry(row.id),
          title: "Issuing Registry Record",
        });
        break;

      case "Relying Registrar Tab":
        setDeleteConfig({
          item: row,
          action: () => deleteRelyingRegistry(row.id),
          title: "Relying Registry Record",
        });
        break;

      case "Submissions":
        setDeleteConfig({
          item: row,
          action: () => deleteSubmission(row.id),
          title: "Submission",
        });
        break;

      default:
        break;
    }
  };

  const handleRefresh = () => {
    fetchRegistryData();
  };

  useEffect(() => {
    setActiveTab(
      authState.role === "admin" ? "Central Registry" : "Submissions",
    );

    fetchRegistryData();
  }, [authState.role]);

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
        { header: "Actions", accessor: "actions" },
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
        { header: "Actions", accessor: "actions" },
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
        { header: "Actions", accessor: "actions" },
      ],
      data: relyingRegistryData,
    },

    Submissions: {
      title: "Submission History",
      columns: [
        {
          header: "Submitted At",
          accessor: "submitted_at",
        },
        {
          header: "Submitted By",
          accessor: "submitted_by",
        },
        {
          header: "QBID",
          accessor: "qbid",
        },
        {
          header: "QB Name",
          accessor: "qb_name",
        },
        {
          header: "Reference No.",
          accessor: "submission_reference_no",
        },
        {
          header: "Registrar",
          accessor: "registrar_name",
        },
        {
          header: "SEC Form 39-QB",
          accessor: "sec_form39_qb_url",
        },
        {
          header: "Letter of Undertaking",
          accessor: "undertaking_url",
        },
        {
          header: "SEC Form 39-Regs AR",
          accessor: "sec_form39_regs_ar_url",
        },
        { header: "Actions", accessor: "actions" },
      ],
      data: submissionsData,
    },
  };

  const currentRegistry =
    registryConfig[activeTab] || registryConfig["Central Registry"];

  const filteredData = currentRegistry.data.filter((row) =>
    currentRegistry.columns.some((column) =>
      String(row[column.accessor] ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ),
  );

  const sortedData = [...filteredData];

  if (activeTab === "Submissions") {
    sortedData.sort(
      (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at),
    );
  }

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
          <MyRegistryToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentRegistry={currentRegistry}
            filteredData={filteredData}
            sortedData={sortedData}
            activeTab={activeTab}
            onRefresh={handleRefresh}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            tableName="registryTable"
          />

          {/* Table */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="p-3 bg-warning-subtle fw-semibold text-warning-emphasis d-flex justify-content-between align-items-center">
                <span>{currentRegistry.title}</span>
              </div>

              <div className="table-responsive">
                <table
                  className="table table-hover align-middle mb-0 irr-table"
                  id="registryTable"
                >
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
                              {column.accessor === "submitted_at" ? (
                                dateFormatter(row[column.accessor])
                              ) : column.accessor === "qb_name" ? (
                                formatQBName(row.qb_name)
                              ) : column.accessor === "qb_status" ? (
                                <span
                                  className={`badge ${
                                    row.qb_status === "ACTIVE"
                                      ? "bg-success"
                                      : row.qb_status === "EXPIRED"
                                        ? "bg-danger"
                                        : row.qb_status === "SUSPENDED"
                                          ? "bg-warning"
                                          : "bg-dark"
                                  }`}
                                >
                                  {row.qb_status}
                                </span>
                              ) : column.accessor === "actions" ? (
                                <div className="d-flex gap-2">
                                  <button
                                    className="btn btn-warning btn-sm d-inline-flex align-items-center gap-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editRegistryModal"
                                    onClick={() => handleEditClick(row)}
                                  >
                                    <FaEdit />
                                    Edit
                                  </button>

                                  <button
                                    className="btn btn-danger btn-sm d-inline-flex align-items-center gap-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteRegistryModal"
                                    onClick={() => handleDeleteClick(row)}
                                  >
                                    <FaTrash />
                                    Delete
                                  </button>
                                </div>
                              ) : [
                                  "sec_form39_qb_url",
                                  "undertaking_url",
                                  "sec_form39_regs_ar_url",
                                ].includes(column.accessor) ? (
                                row[column.accessor] ? (
                                  <a
                                    href={row[column.accessor]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <CiLink className="fs-3 text-primary" />
                                  </a>
                                ) : (
                                  "-"
                                )
                              ) : (
                                (row[column.accessor] ?? "-")
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={currentRegistry.columns.length}
                          className="text-center align-middle"
                          style={{ height: "250px" }}
                        >
                          <h5 className="text-muted mb-0">No records found.</h5>
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

        <EditRegistryModal
          selectedItem={editConfig.item}
          title={editConfig.title}
          type={editConfig.type}
          onSuccess={fetchRegistryData}
          closeModal={closeEditModal}
        />
        <DeleteRegistryModal
          selectedItem={deleteConfig.item}
          deleteAction={deleteConfig.action}
          deleteLoading={deleteLoading}
          title={deleteConfig.title}
        />
      </section>
    </>
  );
};

export default MyRegistry;
