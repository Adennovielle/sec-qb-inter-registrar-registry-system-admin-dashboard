import React from "react";

const IssuingRegistryForm = ({ values, errors, touched, handleChange }) => {
  return (
    <>
      <h5 className="fw-bold mb-4">Issuing Registry Information</h5>

      <div className="row">
        {/* QBID */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">QBID</label>
          <input
            type="text"
            className="form-control"
            value={values.qbid}
            disabled
          />
        </div>

        {/* QB Type */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">QB Type</label>
          <input
            type="text"
            className="form-control"
            value={values.qbType}
            disabled
          />
        </div>

        {/* Registration Date */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Registration Date</label>
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

        {/* Certificate Number */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Certificate No.</label>
          <input
            type="text"
            className="form-control"
            name="certificateNo"
            value={values.certificateNo}
            onChange={handleChange}
          />
        </div>

        {/* Validity Period */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Validity Period</label>
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

        {/* QB Status */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">QB Status</label>

          <select
            className="form-select"
            name="qbStatus"
            value={values.qbStatus}
            onChange={handleChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
          </select>
        </div>

        {/* Issuing Registrar */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Issuing Registrar</label>

          <input
            type="text"
            className="form-control"
            value={values.issuingRegistrar}
            disabled
          />
        </div>

        {/* Relying Registrar */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">
            Name of Relying Registrar
          </label>

          <input
            type="text"
            className="form-control"
            name="relyingRegistrar"
            value={values.relyingRegistrar}
            onChange={handleChange}
          />
        </div>

        {/* Evaluation Date */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Date of Evaluation</label>

          <input
            type="date"
            className="form-control"
            name="evaluationDate"
            value={values.evaluationDate}
            onChange={handleChange}
          />
        </div>

        {/* Evaluator Name */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Evaluator Name</label>

          <input
            type="text"
            className="form-control"
            name="evaluatorName"
            value={values.evaluatorName}
            onChange={handleChange}
          />
        </div>

        {/* Evaluator Designation */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">
            Evaluator Designation
          </label>

          <input
            type="text"
            className="form-control"
            name="evaluatorDesignation"
            value={values.evaluatorDesignation}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default IssuingRegistryForm;
