import React from "react";
import { CiLink } from "react-icons/ci";

const SubmissionForm = ({ values, errors, touched, handleChange }) => {
  return (
    <>
      <h5 className="fw-bold mb-4">Submission Information</h5>

      <div className="row g-3">
        {/* Submitted At */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Submitted At</label>

          <input
            type="datetime-local"
            name="submitted_at"
            className="form-control"
            value={values.submitted_at || ""}
            onChange={handleChange}
          />
        </div>

        {/* Submitted By */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Submitted By</label>

          <input
            type="text"
            name="submitted_by"
            className="form-control"
            value={values.submitted_by || ""}
            onChange={handleChange}
          />
        </div>

        {/* QBID */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            QB Identification Number
          </label>

          <input
            type="text"
            name="qbid"
            className="form-control"
            value={values.qbid || ""}
            readOnly
          />
        </div>

        {/* QB Name */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">QB Name</label>

          <input
            type="text"
            name="qb_name"
            className="form-control"
            value={values.qb_name || ""}
            onChange={handleChange}
          />
        </div>

        {/* Reference Number */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Submission Reference No.
          </label>

          <input
            type="text"
            name="submission_reference_no"
            className="form-control"
            value={values.submission_reference_no || ""}
            readOnly
          />
        </div>

        {/* Registrar */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Registrar</label>

          <input
            type="text"
            name="registrar_name"
            className="form-control"
            value={values.registrar_name || ""}
            onChange={handleChange}
          />
        </div>

        {/* SEC Form 39-QB */}
        <div className="col-md-4">
          <label className="form-label fw-semibold">SEC Form 39-QB</label>

          <div className="form-control d-flex align-items-center justify-content-between">
            <span className="text-truncate">
              {values.sec_form39_qb_original_name || "No file"}
            </span>

            {values.sec_form39_qb_url && (
              <a
                href={values.sec_form39_qb_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiLink className="fs-4 text-primary" />
              </a>
            )}
          </div>
        </div>

        {/* Undertaking */}
        <div className="col-md-4">
          <label className="form-label fw-semibold">
            Letter of Undertaking
          </label>

          <div className="form-control d-flex align-items-center justify-content-between">
            <span className="text-truncate">
              {values.undertaking_original_name || "No file"}
            </span>

            {values.undertaking_url && (
              <a
                href={values.undertaking_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiLink className="fs-4 text-primary" />
              </a>
            )}
          </div>
        </div>

        {/* SEC Form 39-Registrar AR */}
        <div className="col-md-4">
          <label className="form-label fw-semibold">
            SEC Form 39-Registrar AR
          </label>

          <div className="form-control d-flex align-items-center justify-content-between">
            <span className="text-truncate">
              {values.sec_form39_regs_ar_original_name || "No file"}
            </span>

            {values.sec_form39_regs_ar_url && (
              <a
                href={values.sec_form39_regs_ar_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiLink className="fs-4 text-primary" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionForm;
