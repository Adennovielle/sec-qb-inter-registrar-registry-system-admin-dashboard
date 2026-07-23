import React from "react";
import Swal from "sweetalert2";
import { formatQBName } from "../../utils/fomatQbName";

const DeleteRegistryModal = ({
  selectedItem,
  deleteAction,
  deleteLoading,
  title,
}) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `Delete ${title}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteAction();

        await Swal.fire({
          title: "Deleted!",
          text: `${title} has been deleted.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete record.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="modal fade" id="deleteRegistryModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Delete {title}</h5>
          </div>

          <div className="modal-body">
            <p>Are you sure you want to delete this {title}?</p>

            <div className="alert alert-warning">
              {selectedItem?.qbid && (
                <>
                  <strong>QBID:</strong> {selectedItem.qbid}
                  <br />
                </>
              )}

              {selectedItem?.qb_name && (
                <>
                  <strong>Name:</strong> {formatQBName(selectedItem.qb_name)}
                </>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRegistryModal;
