import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import UsersToolbar from "../../components/UsersToolbar";
import UserForm from "../Modals/UserForm";
import DeleteModal from "../Modals/DeleteModal";
import "./Users.css";
import TableFooter from "../../components/TableFooter";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formMode, setFormMode] = useState("create");

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
  };
  const handleRefresh = () => {
    getUsers();
  };
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormMode("edit");

    const modal = new Modal(document.getElementById("userModal"));
    modal.show();
  };

  useEffect(() => {
    getUsers();
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

  const deleteUser = async (id) => {
    try {
      setDeleteLoading(true);

      await axios.delete(`http://localhost:8080/auth/users/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      const modal = Modal.getInstance(
        document.getElementById("deleteUserModal"),
      );

      modal?.hide();
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("padding-right");
      setSelectedUser(null);

      await getUsers();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete user.",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredData = usersData.filter((user) =>
    Object.values(user).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortOrder) return 0;

    return sortOrder === "asc"
      ? a.username.localeCompare(b.username)
      : b.username.localeCompare(a.username);
  });

  const userColumns = [
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Registrar ID", accessor: "registrar_id" },
    { header: "Registrar Name", accessor: "registrar_name" },
    { header: "Role", accessor: "role" },
  ];

  return (
    <section id="users">
      {/* Toolbar */}
      <UsersToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortedData={sortedData}
        columns={userColumns}
        filename="Users"
        searchPlaceholder="Search username or email..."
        onRefresh={handleRefresh}
        tableName="usersTable"
      />
      <div className="card shadow-sm ">
        {/* Header */}
        <div className="p-3 rounded-top-3 bg-warning-subtle fw-semibold text-warning-emphasis d-flex justify-content-between align-items-center">
          <span>Users</span>
          <button
            type="button"
            className="btn btn-success d-inline-flex align-items-center gap-1"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
            onClick={() => {
              setFormMode("create");
              setSelectedUser(null);
            }}
          >
            <span>Create User</span>
            <IoMdAdd className="fs-5" />
          </button>
        </div>
        {/* Table */}
        <div className="table-responsive">
          <table
            className="table table-hover align-middle mb-0 irr-table"
            id="usersTable"
          >
            <thead className="table-success">
              <tr>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>REGISTRAR ID</th>
                <th>REGISTRAR NAME</th>
                <th>ROLE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.registrar_id || "-"}</td>
                  <td>{user.registrar_name || "-"}</td>

                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "bg-danger-subtle text-danger"
                          : "bg-primary-subtle text-primary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2 d-inline-flex align-items-center gap-1"
                      onClick={() => openEditModal(user)}
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm d-inline-flex align-items-center gap-1"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteUserModal"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TABLE Footer */}
        <TableFooter filteredData={filteredData} />
      </div>

      {/* Create User Modal */}
      <div
        className="modal fade"
        id="userModal"
        tabIndex="-1"
        aria-labelledby="createUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="createUserModalLabel">
                {formMode === "edit" ? "Update User" : "Create User"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <UserForm
                mode={formMode}
                user={selectedUser}
                onSuccess={getUsers}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        selectedUser={selectedUser}
        deleteUser={deleteUser}
        deleteLoading={deleteLoading}
      />
    </section>
  );
};

export default Users;
