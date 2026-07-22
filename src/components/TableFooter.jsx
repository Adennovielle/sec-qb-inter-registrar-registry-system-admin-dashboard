import React from "react";
import { BsChevronBarLeft, BsChevronRight } from "react-icons/bs";

function TableFooter({ filteredData }) {
  return (
    <div>
      {/* TABLE Footer */}
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
  );
}

export default TableFooter;
