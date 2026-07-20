import React, { useEffect, useState } from "react";
import "./QbIdSearch.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QbIdSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const searchQbId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/qualified-buyers/search/${searchValue}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        },
      );
      setSearchResult(response.data.qualified_buyer);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  return (
    <section
      className="qualified-buyer-verification"
      id="qualified-buyer-verification"
    >
      <div
        className="text-center text-white fs-5 te bg-sec-color"
        style={{ padding: "25px" }}
        searchResult
      >
        To verify QB status, enter the provided Qualified Buyer Identification
        Number (QBID) below:
      </div>

      <div className="d-flex justify-content-center mt-5">
        <div
          className="shadow-lg border-0 rounded-3 "
          style={{ width: "100%", maxWidth: "1000px" }}
        >
          <div className="card-body p-4 bg-light rounded-2 ">
            <h4 className="fw-bold mb-1">
              <span className="position-relative">
                Qualified Buyer Verification
              </span>
            </h4>
            <small className="text-secondary mb-4">
              Securities and Exchange Commission – Qualified Buyer
              Inter-Registrar Registry System
            </small>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Enter Qualified Buyer Identification Number (QBID)"
            />
            <button className="btn btn-success px-4" onClick={searchQbId}>
              Search
            </button>
            <button
              className="btn btn-light border px-4 ms-2"
              // onClick={handleClear}
            >
              Clear
            </button>
            <div
            // className={`${
            //   searchError === "Searching..."
            //     ? "text-secondary"
            //     : "text-danger"
            // } mt-2`}
            >
              {/* {searchError} */}
            </div>
            {searchResult && (
              <div>
                <div className="card border-success shadow-sm mt-3">
                  <div className="card-body">
                    <table className="table table-borderless align-middle mb-3">
                      <tbody>
                        <tr className="border-bottom">
                          <th width="35%">QBID</th>
                          <td className="text-end"> {searchResult.qbid}</td>
                        </tr>

                        <tr className="border-bottom">
                          <th>QB Name</th>
                          <td className="text-end">{searchResult.qb_name}</td>
                        </tr>

                        <tr className="border-bottom">
                          <th>QB Type</th>
                          <td className="text-end">{searchResult.qb_type}</td>
                        </tr>

                        <tr className="border-bottom">
                          <th>Registration Date</th>
                          <td className="text-end">
                            {searchResult.registration_date}
                          </td>
                        </tr>

                        <tr className="border-bottom">
                          <th>COR Control Number</th>
                          <td className="text-end">
                            {searchResult.cor_control_number}
                          </td>
                        </tr>

                        <tr className="border-bottom">
                          <th>Validity Period</th>
                          <td className="text-end">
                            {searchResult.validity_period}
                          </td>
                        </tr>

                        <tr className="border-bottom">
                          <th>QB Status</th>

                          <td className="text-end">
                            <span className={`badge bg-success`}>
                              {searchResult.qb_status}
                            </span>
                          </td>
                        </tr>

                        <tr className="border-bottom">
                          <th>Issuing Registrar</th>
                          <td className="text-end">
                            {searchResult.issuing_registrar}
                          </td>
                        </tr>

                        <tr>
                          <th>Relying Registrar</th>
                          <td className="text-end">
                            {searchResult.relying_registrar}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <hr className="border-secondary border-dashed" />

                    <small className="text-muted d-block">
                      <strong>Search Date & Time:</strong> 20 Jul 2026, 13:20:06
                    </small>

                    <small className="text-muted d-block">
                      <strong>Verification Code:</strong> tI91qZTxjb5e8Sge
                    </small>

                    <small className="fst-italic text-secondary">
                      This record was generated by the SEC QB Inter-Registrar
                      Registry System.
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-primary ps-4 pe-4">
                    Export pdf
                  </button>
                  <button className="btn btn-warning ps-4 pe-4">
                    Export image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QbIdSearch;
