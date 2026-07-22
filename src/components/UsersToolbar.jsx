import React, { useEffect } from "react";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { exportExcel, exportPDF, printTable } from "../utils/exportUtils";
import { Dropdown } from "bootstrap";
const UsersToolbar = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  sortedData,
  columns,
  filename,
  searchPlaceholder,
  onRefresh,
  tableName,
}) => {
  useEffect(() => {
    const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');

    dropdowns.forEach((dropdown) => {
      new Dropdown(dropdown);
    });

    console.log("Dropdown initialized:", dropdowns.length);
  }, []);
  return (
    <div className="card mb-4 mb-3 p-4" id="toolbar">
      <div className="d-flex ">
        {/* Filter */}
        <div className="d-flex">
          <div className="dropdown me-2 ">
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
                  onClick={() => {
                    setSortOrder("asc");
                  }}
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

          {/* Export */}
          <div className="dropdown me-2">
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
                  onClick={() => exportExcel(columns, sortedData, filename)}
                >
                  Excel
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => exportPDF(columns, sortedData, filename)}
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
        </div>

        {/* Search */}
        <div className="input-group ms-auto me-2" style={{ maxWidth: 500 }}>
          <span className="input-group-text">
            <BsSearch />
          </span>

          <input
            className="form-control"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Refresh */}
        <button
          className="btn btn-success d-flex gap-1 align-items-center"
          onClick={onRefresh}
        >
          <BsArrowClockwise />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default UsersToolbar;
