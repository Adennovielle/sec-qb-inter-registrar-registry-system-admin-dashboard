import React from "react";

const QualifiedBuyerForm = ({ values, errors, touched, handleChange }) => {
  return (
    <>
      <h5 className="fw-bold mb-4">Qualified Buyer Information</h5>

      <div className="row">
        {/* QBID */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">
            QB Identification Number (QBID)
          </label>

          <input
            type="text"
            className={`form-control ${
              touched.qbid && errors.qbid ? "is-invalid" : ""
            }`}
            name="qbid"
            value={values.qbid}
            onChange={handleChange}
          />

          <div className="invalid-feedback">{errors.qbid}</div>
        </div>

        {/* QB Type */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Qualified Buyer Type</label>

          <input type="text" className="form-control" value={values.qbType} />
        </div>
      </div>

      {/* Institutional */}
      {values.qbType === "institutional" && (
        <div className="mb-4">
          <label className="form-label fw-semibold">Institution Name</label>

          <input
            type="text"
            className={`form-control ${
              touched.institutionName && errors.institutionName
                ? "is-invalid"
                : ""
            }`}
            name="institutionName"
            value={values.institutionName}
            onChange={handleChange}
          />

          <div className="invalid-feedback">{errors.institutionName}</div>
        </div>
      )}

      {/* Individual */}
      {values.qbType === "individual" && (
        <>
          <label className="form-label fw-semibold mb-3">
            Qualified Buyers
          </label>

          {values.qualifiedBuyers?.map((buyer, index) => (
            <div className="row mb-3" key={index}>
              <div className="col-md-3">
                <input className="form-control" value={buyer.firstName} />
              </div>

              <div className="col-md-3">
                <input className="form-control" value={buyer.middleName} />
              </div>

              <div className="col-md-3">
                <input className="form-control" value={buyer.lastName} />
              </div>

              <div className="col-md-3">
                <input className="form-control" value={buyer.suffix} />
              </div>
            </div>
          ))}
        </>
      )}

      <hr className="my-4" />

      <div className="row">
        {/* Registration Date */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">
            Date of Registration as QB
          </label>

          <input
            type="date"
            className={`form-control ${
              touched.dateOfRegistration && errors.dateOfRegistration
                ? "is-invalid"
                : ""
            }`}
            name="dateOfRegistration"
            value={values.dateOfRegistration}
            onChange={handleChange}
          />

          <div className="invalid-feedback">{errors.dateOfRegistration}</div>
        </div>

        {/* Validity */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">
            Validity Date of QB Status
          </label>

          <input
            type="date"
            className={`form-control ${
              touched.validityDate && errors.validityDate ? "is-invalid" : ""
            }`}
            name="validityDate"
            value={values.validityDate}
            onChange={handleChange}
          />

          <div className="invalid-feedback">{errors.validityDate}</div>
        </div>

        {/* COR */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">COR Control Number</label>

          <input
            type="text"
            className={`form-control ${
              touched.corControlNumber && errors.corControlNumber
                ? "is-invalid"
                : ""
            }`}
            name="corControlNumber"
            value={values.corControlNumber}
            onChange={handleChange}
          />

          <div className="invalid-feedback">{errors.corControlNumber}</div>
        </div>

        {/* QB Status */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">QB Status</label>

          <select
            className={`form-select ${
              touched.qbStatus && errors.qbStatus ? "is-invalid" : ""
            }`}
            name="qbStatus"
            value={values.qbStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
          </select>

          <div className="invalid-feedback">{errors.qbStatus}</div>
        </div>
      </div>
    </>
  );
};

export default QualifiedBuyerForm;
