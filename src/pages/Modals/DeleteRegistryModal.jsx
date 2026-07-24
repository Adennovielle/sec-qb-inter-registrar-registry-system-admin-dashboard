import React from "react";
import Swal from "sweetalert2";
import { formatQBName } from "../../utils/fomatQbName";
import { dateFormatter } from "../../utils/dateFormatter";

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

            <div className="alert alert-warning mb-0">
              {title === "Qualified Buyer" && (
                <>
                  <strong>QBID:</strong> {selectedItem?.qbid}
                  <br />
                  <strong>Name:</strong>{" "}
                  {selectedItem?.qb_name
                    ? formatQBName(selectedItem.qb_name)
                    : "-"}
                </>
              )}

              {title === "Submission" && (
                <>
                  <strong>Reference No.:</strong>{" "}
                  {selectedItem?.submission_reference_no}
                  <br />
                  {selectedItem?.qbid && (
                    <>
                      <strong>QBID:</strong> {selectedItem.qbid}
                      <br />
                    </>
                  )}
                  {selectedItem?.qb_name && (
                    <>
                      <strong>QB Name:</strong>{" "}
                      {selectedItem?.qb_name
                        ? formatQBName(selectedItem.qb_name)
                        : "-"}
                      <br />
                    </>
                  )}
                  <strong>Submitted By:</strong> {selectedItem?.submitted_by}
                  <br />
                  <strong>Registrar:</strong> {selectedItem?.registrar_name}
                  <br />
                  <strong>Submitted At:</strong>{" "}
                  {selectedItem?.submitted_at
                    ? dateFormatter(selectedItem.submitted_at)
                    : "-"}
                </>
              )}

              {title === "Issuing Registry Record" && (
                <>
                  <strong>QBID:</strong> {selectedItem?.qbid}
                  <br />
                  <strong>Certificate No.:</strong>{" "}
                  {selectedItem?.certificate_no}
                </>
              )}

              {title === "Relying Registry Record" && (
                <>
                  <strong>QBID:</strong> {selectedItem?.qbid}
                  <br />
                  <strong>Certificate No.:</strong>{" "}
                  {selectedItem?.certificate_no}
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
