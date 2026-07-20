import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "../Modals/CreateUser";
import { IoMdAdd } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import { dateFormatter } from "../../utils/dateFormatter";
import { IoFilterSharp } from "react-icons/io5";
// import Toolbar from "./Toolbar";
import { BsChevronBarLeft, BsChevronRight } from "react-icons/bs";
import CreateQualifiedBuyerModal from "../Modals/CreateQualifiedBuyerModal";
import "./Users.css";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [usersData, setUsersData] = useState([]);

  const registryTabs = ["Users"];

  const handleRefresh = () => {
    getUsers();
    // getSubmissions();
    // getQualifiedBuyers();
    // getQualifiedBuyersRelyingRegistry();
  };

  useEffect(() => {
    getUsers();
  }, []);

  //   const handleExportExcel = () => {
  //     const exportData = sortedData.map((row) => {
  //       const obj = {};

  //       currentRegistry.columns.forEach((col) => {
  //         obj[col.header] = row[col.accessor] ?? "-";
  //       });

  //       return obj;
  //     });

  //     const worksheet = XLSX.utils.json_to_sheet(exportData);

  //     const workbook = XLSX.utils.book_new();

  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Registry");

  //     XLSX.writeFile(workbook, `${activeTab}.xlsx`);
  //   };
  //   const handleExportPDF = () => {
  //     const doc = new jsPDF();

  //     const headers = [currentRegistry.columns.map((col) => col.header)];

  //     const rows = sortedData.map((row) =>
  //       currentRegistry.columns.map((col) => row[col.accessor] ?? "-"),
  //     );

  //     autoTable(doc, {
  //       head: headers,
  //       body: rows,
  //     });

  //     doc.save(`${activeTab}.pdf`);
  //   };
  //   const handlePrint = () => {
  //     window.print();
  //   };

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

  return (
    <section id="users">
      <div className="card shadow-sm border-0">
        {/* Header */}
        <div className="p-3 bg-warning-subtle fw-semibold text-warning-emphasis d-flex justify-content-between align-items-center">
          <span>Users</span>
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

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 irr-table">
            <thead className="table-success">
              <tr>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>REGISTRAR ID</th>
                <th>REGISTRAR NAME</th>
                <th>ROLE</th>
              </tr>
            </thead>

            <tbody>
              {usersData.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.registrar_id}</td>
                  <td>{user.registrar_name}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "bg-danger" : "bg-primary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
          <small>Showing {usersData.length} record(s)</small>

          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <button className="page-link">&laquo;</button>
              </li>

              <li className="page-item active">
                <button className="page-link">1</button>
              </li>

              <li className="page-item disabled">
                <button className="page-link">&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Users;
