import React from "react";
import "./SubmissionPortal.css";

const SubmissionPortal = () => {
  return (
    <section id="submissionPortal" className="py-5">
      <div className="container d-flex align-items-center justify-content-center">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body ">
            {/* Header */}
            <h4 className="fw-bold mb-1">Submission Portal</h4>

            <p className="text-secondary mb-4 fs-6 text-start">
              Qualified Buyer Inter-Registrar Registry – Securities and Exchange
              Commission
            </p>

            {/* Registrar Name */}
            <div className="mb-4 ">
              <label className="form-label fw-semibold">Registrar Name</label>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Registrar Name"
              />
            </div>

            {/* Submission Type */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Submission Type</label>

              <select className="form-select form-select-lg">
                <option>-- Select Submission Type --</option>
                <option>SEC Form 39-Registrar-QB</option>
                <option>Annual Attestation of QBs' Continued Compliance</option>
                <option>SEC Form 39-Registrar-Annual Report(AR)</option>
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-2">
              <label className="form-label fw-semibold">
                Upload PDF (Max 10 MB)
              </label>

              <input className="form-control" type="file" accept=".pdf" />
            </div>

            <small className="text-secondary fst-italic">
              File will be saved as:
              <br />
              RegistrarName_Form39-AnnualReport_ReferenceNo.pdf
            </small>

            {/* Progress */}
            <div className="progress my-4" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "70%" }}
              ></div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button className="btn btn-success px-4">Submit</button>

              <button className="btn btn-outline-secondary">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionPortal;
