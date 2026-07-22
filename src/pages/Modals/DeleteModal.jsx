import React from "react";

const DeleteModal = ({ selectedUser, deleteUser, deleteLoading }) => {
  return (
    <div
      className="modal fade"
      id="deleteUserModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Delete User</h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>

            <div className="alert alert-warning mb-0">
              <strong>Username:</strong> {selectedUser?.username}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={() => deleteUser(selectedUser.id)}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
