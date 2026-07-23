import React from "react";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { exportExcel, exportPDF, printTable } from "../utils/exportUtils";

const MyRegistryToolbar = ({
  searchTerm,
  setSearchTerm,
  currentRegistry,
  filteredData,
  activeTab,
  onRefresh,
  sortOrder,
  setSortOrder,
  sortedData,
  showTabs,
  tableName,
}) => {
  return (
    <div>
      <div className="card p-2 mb-4" id="toolbar">
        <div className="card-body">
          <div className="d-flex">
            <div className="dropdown me-2">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                data-bs-toggle="dropdown"
              >
                <IoFilterSharp />
                Filters
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSortOrder("asc")}
                  >
                    ↑ Ascending (A-Z)
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSortOrder("desc")}
                  >
                    ↓ Descending (Z-A)
                  </button>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSortOrder("")}
                  >
                    Clear Filter
                  </button>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                data-bs-toggle="dropdown"
              >
                <CiExport />
                Export
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      exportExcel(
                        currentRegistry.columns,
                        sortedData,
                        activeTab,
                      )
                    }
                  >
                    Excel
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      exportPDF(currentRegistry.columns, sortedData, activeTab)
                    }
                  >
                    PDF
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => printTable(tableName)}
                  >
                    Print
                  </button>
                </li>
              </ul>
            </div>

            <div className="input-group ms-auto me-2" style={{ maxWidth: 500 }}>
              <span className="input-group-text">
                <BsSearch />
              </span>

              <input
                className="form-control"
                placeholder="Search buyer ID, registrar, or COR Control No...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="btn btn-success" onClick={onRefresh}>
              <BsArrowClockwise />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRegistryToolbar;
