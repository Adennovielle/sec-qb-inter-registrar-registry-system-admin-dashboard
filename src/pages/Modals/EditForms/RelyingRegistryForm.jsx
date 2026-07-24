import React from "react";

const RelyingRegistryForm = ({ values, errors, touched, handleChange }) => {
  return (
    <>
      <h5 className="fw-bold mb-4">Relying Registry Information</h5>

      <div className="row g-3">
        {/* QBID */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            QB Identification Number
          </label>

          <input
            type="text"
            name="qbid"
            className={`form-control ${
              touched.qbid && errors.qbid ? "is-invalid" : ""
            }`}
            value={values.qbid}
            onChange={handleChange}
            readOnly
          />

          {touched.qbid && errors.qbid && (
            <div className="invalid-feedback">{errors.qbid}</div>
          )}
        </div>

        {/* Issuing Registrar */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Issuing Registrar</label>

          <input
            type="text"
            name="issuing_registrar"
            className="form-control"
            value={values.issuing_registrar}
            onChange={handleChange}
          />
        </div>

        {/* QB Status */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">QB Status</label>

          <select
            name="qb_status"
            className="form-select"
            value={values.qb_status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
        </div>

        {/* Certificate Number */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Certificate Number</label>

          <input
            type="text"
            name="certificate_no"
            className="form-control"
            value={values.certificate_no}
            onChange={handleChange}
          />
        </div>

        {/* Validity Period */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Validity Period</label>

          <input
            type="date"
            name="validity_period"
            className="form-control"
            value={values.validity_period}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default RelyingRegistryForm;
