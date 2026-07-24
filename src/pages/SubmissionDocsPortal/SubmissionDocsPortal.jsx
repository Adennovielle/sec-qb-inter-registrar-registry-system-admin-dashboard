import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import "./SubmissionDocsPortal.css";
import Swal from "sweetalert2";
import ScrollToError from "../../components/inputErrorAutoFocus";

const validationSchema = Yup.object({
  qbType: Yup.string().required("Please select Qualified Buyer Type."),
  institutionName: Yup.string().when("qbType", {
    is: "institutional",
    then: (schema) => schema.required("Institution Name is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  qbid: Yup.object({
    registrarCode: Yup.string()
      .matches(/^[A-Z]{3}$/, "Must be 3 letters")
      .required("Registrar Code is required"),
    buyerTypeCode: Yup.string()
      .matches(/^(IND|INS)$/, "Must be IND or INS")
      .required("Buyer Type Code is required"),

    yearCode: Yup.string()
      .matches(/^\d{2}$/, "Must be 2 digits")
      .required("Year Code is required"),

    serialCode: Yup.string()
      .matches(/^[A-Za-z0-9]{6}$/, "Must be 6 alphanumeric characters")
      .required("Serial Code is required"),
  }),
  dateOfRegistration: Yup.date().required("Date of Registration is required."),
  validityDate: Yup.date().required("Validity Date is required."),
  corControlNumber: Yup.string().required("COR Control Number is required."),
  evaluatorName: Yup.string().required("Evaluator Name is required."),
  evaluatorDesignation: Yup.string().required("Designation is required."),
  evaluatorSecLicense: Yup.string().required(
    "SEC Registration License Number is required.",
  ),
  evaluationDate: Yup.date().required("Evaluation Date is required."),
  qualifiedBuyers: Yup.array().when("qbType", {
    is: "individual",
    then: (schema) =>
      schema.of(
        Yup.object({
          firstName: Yup.string().required("Required"),
          middleName: Yup.string(),
          lastName: Yup.string().required("Required"),
          suffix: Yup.string(),
        }),
      ),
  }),
  secForm39Qb: Yup.mixed().required("SEC Form 39-Registrar-QB is required."),
  letterOfUndertaking: Yup.mixed().required(
    "Letter of Undertaking is required.",
  ),
  secForm39RegsAr: Yup.mixed().nullable(),
});

const SubmissionDocsPortal = () => {
  return (
    <section id="SubmissionDocsPortal" className="container py-4">
      <Formik
        initialValues={{
          qbType: "",
          qualifiedBuyers: [
            {
              firstName: "",
              middleName: "",
              lastName: "",
            },
          ],
          institutionName: "",
          corControlNumber: "",
          dateOfRegistration: "",
          validityDate: "",
          evaluatorName: "",
          evaluatorDesignation: "",
          evaluatorSecLicense: "",
          evaluationDate: "",
          qbid: {
            registrarCode: "",
            buyerTypeCode: "",
            yearCode: "",
            serialCode: "",
          },
          secForm39Qb: null,
          letterOfUndertaking: null,
          secForm39RegsAr: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append("qbType", values.qbType);
            formData.append(
              "qualifiedBuyers",
              JSON.stringify(values.qualifiedBuyers),
            );
            formData.append("institutionName", values.institutionName);
            formData.append("corControlNumber", values.corControlNumber);
            formData.append("dateOfRegistration", values.dateOfRegistration);
            formData.append("validityDate", values.validityDate);
            formData.append("evaluatorName", values.evaluatorName);
            formData.append(
              "evaluatorDesignation",
              values.evaluatorDesignation,
            );
            formData.append("evaluatorSecLicense", values.evaluatorSecLicense);
            formData.append("evaluationDate", values.evaluationDate);
            formData.append("qbid.registrarCode", values.qbid.registrarCode);
            formData.append("qbid.buyerTypeCode", values.qbid.buyerTypeCode);
            formData.append("qbid.yearCode", values.qbid.yearCode);
            formData.append("qbid.serialCode", values.qbid.serialCode);
            formData.append("secForm39Qb", values.secForm39Qb);
            formData.append("letterOfUndertaking", values.letterOfUndertaking);
            if (values.secForm39RegsAr) {
              formData.append("secForm39RegsAr", values.secForm39RegsAr);
            }

            Swal.fire({
              title: "Uploading...",
              text: "Please wait while your documents are being submitted.",
              allowOutsideClick: false,
              allowEscapeKey: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            console.log(values);

            for (const pair of formData.entries()) {
              console.log(pair[0], pair[1]);
            }
            const response = await axios.post(
              "http://localhost:8080/submissions",
              formData,
              {
                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                },
              },
            );

            Swal.fire({
              icon: "success",
              title: "Submission Successful!",
              text:
                response.data.message || "Documents submitted successfully.",
              confirmButtonColor: "#198754",
            });

            resetForm();
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Submission Failed",
              text:
                err.response?.data?.message ||
                "Something went wrong. Please try again.",
              confirmButtonColor: "#dc3545",
            });

            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form>
            <ScrollToError />
            <div className="card shadow border-0">
              {/* Header */}
              <div className="card-header bg-success text-white py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="fw-bold mb-2">
                      Submission Documents Portal
                    </h4>

                    <p className="mb-0 opacity-75">
                      Upload the required documents for Qualified Buyer
                      registration with the Securities and Exchange Commission
                      (SEC).
                    </p>
                  </div>

                  <div className="text-end">
                    <i className="bi bi-cloud-arrow-up-fill display-4"></i>
                  </div>
                </div>
              </div>

              <div className="card-body p-4">
                {/* Select QB Type */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="fw-bold mb-2">
                      Select Qualified Buyer Type
                    </h5>

                    <p className="text-muted mb-4">
                      Please choose whether you are submitting documents for an
                      <strong> Individual Qualified Buyer</strong> or an
                      <strong> Institutional Qualified Buyer</strong>.
                    </p>

                    <div className="row g-3">
                      {/* Individual */}
                      <div className="col-md-6">
                        <label
                          className={`card h-100 border-2 p-4 cursor-pointer ${
                            values.qbType === "individual"
                              ? "border-success bg-success-subtle"
                              : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            type="radio"
                            className="form-check-input d-none"
                            name="qbType"
                            value="individual"
                            checked={values.qbType === "individual"}
                            onChange={() => {
                              setFieldValue("qbType", "individual");
                              setFieldValue("qbid.buyerTypeCode", "IND");
                            }}
                          />

                          <div className="text-center">
                            <i className="bi bi-person-fill fs-1 text-success"></i>

                            <h5 className="fw-bold mt-3">Individual</h5>

                            <p className="text-muted mb-0">
                              Register one or more individual Qualified Buyers.
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Institutional */}
                      <div className="col-md-6">
                        <label
                          className={`card h-100 border-2 p-4 cursor-pointer ${
                            values.qbType === "institutional"
                              ? "border-success bg-success-subtle"
                              : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            type="radio"
                            className="form-check-input d-none"
                            name="qbType"
                            value="institutional"
                            checked={values.qbType === "institutional"}
                            onChange={() => {
                              setFieldValue("qbType", "institutional");
                              setFieldValue("qbid.buyerTypeCode", "INS");
                            }}
                          />

                          <div className="text-center">
                            <i className="bi bi-building fs-1 text-success"></i>

                            <h5 className="fw-bold mt-3">Institutional</h5>

                            <p className="text-muted mb-0">
                              Register a corporation, company, bank, or
                              institution.
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {touched.qbType && errors.qbType && (
                      <div className="text-danger mt-3">{errors.qbType}</div>
                    )}
                  </div>
                </div>

                {/* {values.qbType && ( */}
                {values.qbType && (
                  <>
                    {/* ================= INDIVIDUAL ================= */}
                    {values.qbType === "individual" && (
                      <>
                        <div className="card border-0 shadow-sm mb-4">
                          <div className="card-header bg-light">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5 className="fw-bold mb-0">
                                  Qualified Buyer(s)
                                </h5>

                                <small className="text-muted">
                                  Enter the information of each individual
                                  Qualified Buyer.
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className="card-body">
                            {values.qualifiedBuyers.map((buyer, index) => (
                              <div className="card border mb-4" key={index}>
                                <div className="card-body">
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="fw-bold mb-0">
                                      Qualified Buyer #{index + 1}
                                    </h6>

                                    <div className="d-flex gap-2">
                                      {/* Add Buyer */}
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                          width: "38px",
                                          height: "38px",
                                        }}
                                        title="Add Qualified Buyer"
                                        onClick={() =>
                                          setFieldValue("qualifiedBuyers", [
                                            ...values.qualifiedBuyers,
                                            {
                                              firstName: "",
                                              middleName: "",
                                              lastName: "",
                                              suffix: "",
                                            },
                                          ])
                                        }
                                      >
                                        <FaPlus />
                                      </button>

                                      {/* Remove Buyer */}
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                          width: "38px",
                                          height: "38px",
                                        }}
                                        title="Remove Qualified Buyer"
                                        disabled={
                                          values.qualifiedBuyers.length === 1
                                        }
                                        onClick={() =>
                                          setFieldValue(
                                            "qualifiedBuyers",
                                            values.qualifiedBuyers.filter(
                                              (_, i) => i !== index,
                                            ),
                                          )
                                        }
                                      >
                                        <FaMinus />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-3 mb-3">
                                      <label className="form-label fw-semibold">
                                        First Name
                                      </label>

                                      <input
                                        className="form-control"
                                        name={`qualifiedBuyers.${index}.firstName`}
                                        value={buyer.firstName}
                                        onChange={handleChange}
                                      />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                      <label className="form-label fw-semibold">
                                        Middle Name
                                      </label>

                                      <input
                                        className="form-control"
                                        name={`qualifiedBuyers.${index}.middleName`}
                                        value={buyer.middleName}
                                        onChange={handleChange}
                                      />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                      <label className="form-label fw-semibold">
                                        Last Name
                                      </label>

                                      <input
                                        className="form-control"
                                        name={`qualifiedBuyers.${index}.lastName`}
                                        value={buyer.lastName}
                                        onChange={handleChange}
                                      />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                      <label className="form-label fw-semibold">
                                        Suffix
                                      </label>

                                      <input
                                        className="form-control"
                                        name={`qualifiedBuyers.${index}.suffix`}
                                        value={buyer.suffix}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* ================= INSTITUTION ================= */}

                    {values.qbType === "institutional" && (
                      <>
                        <h5 className="fw-bold mb-4 ">
                          Institution Information
                        </h5>

                        <div className="mb-4 row">
                          <div>
                            <label className="form-label fw-semibold ">
                              Institution Name
                            </label>
                          </div>

                          <div className="col-lg-6">
                            <input
                              type="text"
                              className={`form-control ${
                                touched.institutionName &&
                                errors.institutionName
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="institutionName"
                              value={values.institutionName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Institution Name"
                            />
                          </div>
                          {touched.institutionName &&
                            errors.institutionName && (
                              <div className="invalid-feedback">
                                {errors.institutionName}
                              </div>
                            )}
                        </div>
                      </>
                    )}

                    {/* ================= SUPPORTING DOCUMENTS ================= */}
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-light">
                        <h5 className="fw-bold mb-0">
                          QB Identification Number (QBID)
                        </h5>
                      </div>

                      <div className="card-body">
                        <p className="text-muted mb-4">
                          Enter the Qualified Buyer Identification Number (QBID)
                          following the prescribed format.
                        </p>

                        <div className="d-flex align-items-start gap-2 flex-wrap">
                          {/* Registrar Code */}
                          <div className="qbid-field">
                            <label className="form-label fw-semibold">
                              Registrar Code
                            </label>

                            <input
                              type="text"
                              maxLength="3"
                              className="form-control text-center"
                              placeholder="ABC"
                              name="qbid.registrarCode"
                              value={values.qbid.registrarCode}
                              onChange={(e) => {
                                setFieldValue(
                                  "qbid.registrarCode",
                                  e.target.value.toUpperCase(),
                                );
                              }}
                            />

                            <small className="text-muted">
                              Three-letter Registrar Code
                            </small>
                          </div>

                          <div className="d-flex align-items-center pt-4">
                            <span className="fs-3 fw-bold text-secondary">
                              -
                            </span>
                          </div>
                          {/* Buyer Type */}
                          <div className="qbid-field">
                            <label className="form-label fw-semibold">
                              Buyer Type
                            </label>

                            <input
                              type="text"
                              maxLength="3"
                              className="form-control text-center"
                              placeholder="IND"
                              name="qbid.buyerTypeCode"
                              value={values.qbid.buyerTypeCode}
                              disabled
                            />

                            <small className="text-muted">IND or INS</small>
                          </div>

                          <div className="d-flex align-items-center pt-4">
                            <span className="fs-3 fw-bold text-secondary">
                              -
                            </span>
                          </div>

                          {/* Year */}
                          <div className="qbid-field">
                            <label className="form-label fw-semibold">
                              Year
                            </label>

                            <input
                              type="text"
                              maxLength="2"
                              className="form-control text-center"
                              placeholder="26"
                              name="qbid.yearCode"
                              value={values.qbid.yearCode}
                              onChange={handleChange}
                            />

                            <small className="text-muted">
                              Two-digit Year Code
                            </small>
                          </div>

                          <div className="d-flex align-items-center pt-4">
                            <span className="fs-3 fw-bold text-secondary">
                              -
                            </span>
                          </div>
                          {/* Serial */}
                          <div className="qbid-field serial">
                            <label className="form-label fw-semibold">
                              Serial Number
                            </label>

                            <input
                              type="text"
                              maxLength="6"
                              className="form-control text-center"
                              placeholder="ABC123"
                              name="qbid.serialCode"
                              value={values.qbid.serialCode}
                              onChange={(e) => {
                                setFieldValue(
                                  "qbid.serialCode",
                                  e.target.value.toUpperCase(),
                                );
                              }}
                            />

                            <small className="text-muted">
                              Six alphanumeric characters (e.g., ABC123)
                            </small>
                          </div>
                        </div>

                        <div className="alert alert-light border mt-4 mb-0">
                          <strong>Format:</strong> ABC-IND-26-ABC123
                        </div>
                      </div>
                    </div>

                    {/* ================= QB STATUS INFORMATION ================= */}

                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-light">
                        <h5 className="fw-bold mb-0">QB Status Information</h5>
                      </div>

                      <div className="card-body">
                        <p className="text-muted mb-4">
                          Provide the registration details and validity
                          information of the Qualified Buyer (QB).
                        </p>

                        <div className="row g-4">
                          {/* COR Control Number */}
                          <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              COR Control Number
                            </label>

                            <input
                              type="text"
                              className={`form-control ${
                                touched.corControlNumber &&
                                errors.corControlNumber
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="corControlNumber"
                              value={values.corControlNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter COR Control Number"
                            />

                            <small className="text-muted">
                              Certificate of Registration (COR) Control Number.
                            </small>

                            {touched.corControlNumber &&
                              errors.corControlNumber && (
                                <div className="invalid-feedback">
                                  {errors.corControlNumber}
                                </div>
                              )}
                          </div>

                          {/* Date of Registration */}
                          <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              Date of Registration as QB
                            </label>

                            <input
                              type="date"
                              className={`form-control ${
                                touched.dateOfRegistration &&
                                errors.dateOfRegistration
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="dateOfRegistration"
                              value={values.dateOfRegistration}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            <small className="text-muted">
                              Date the Qualified Buyer status was approved.
                            </small>

                            {touched.dateOfRegistration &&
                              errors.dateOfRegistration && (
                                <div className="invalid-feedback">
                                  {errors.dateOfRegistration}
                                </div>
                              )}
                          </div>

                          {/* Validity Date */}
                          <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              Validity Date of QB Status
                            </label>

                            <input
                              type="date"
                              className={`form-control ${
                                touched.validityDate && errors.validityDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="validityDate"
                              value={values.validityDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            <small className="text-muted">
                              Expiration or validity date of the QB status.
                            </small>

                            {touched.validityDate && errors.validityDate && (
                              <div className="invalid-feedback">
                                {errors.validityDate}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================= REGISTRAR EVALUATOR DETAILS ================= */}

                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-light">
                        <h5 className="fw-bold mb-0">
                          Registrar Evaluator Details
                        </h5>
                      </div>

                      <div className="card-body">
                        <p className="text-muted mb-4">
                          Provide the information of the Registrar personnel who
                          conducted the Qualified Buyer evaluation.
                        </p>

                        {/* Name */}
                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            Name of Evaluator
                          </label>

                          <input
                            type="text"
                            className={`form-control ${
                              touched.evaluatorName && errors.evaluatorName
                                ? "is-invalid"
                                : ""
                            }`}
                            name="evaluatorName"
                            value={values.evaluatorName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter evaluator's full name"
                          />
                          <i className="text-muted fs-7">
                            Name of Registrar Personnel Who Conducted the
                            Evaluation:
                          </i>

                          {touched.evaluatorName && errors.evaluatorName && (
                            <div className="invalid-feedback">
                              {errors.evaluatorName}
                            </div>
                          )}
                        </div>

                        <div className="row g-4">
                          {/* Designation */}
                          <div className="col-md-6">
                            <label className="form-label fw-semibold">
                              Designation of Evaluator
                            </label>

                            <input
                              type="text"
                              className={`form-control ${
                                touched.evaluatorDesignation &&
                                errors.evaluatorDesignation
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="evaluatorDesignation"
                              value={values.evaluatorDesignation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g. Salesman, FIMS, CIS, AP"
                            />
                            <i className="text-muted fs-7">
                              Designatjon of tne Personnel VVho Conducted the
                              Evaluation (e.g., Salesman, FIMS, CIS, AP of the
                              Registrar)
                            </i>

                            {touched.evaluatorDesignation &&
                              errors.evaluatorDesignation && (
                                <div className="invalid-feedback">
                                  {errors.evaluatorDesignation}
                                </div>
                              )}
                          </div>

                          {/* SEC License */}
                          <div className="col-md-6">
                            <label className="form-label fw-semibold">
                              SEC Registration License Number
                            </label>

                            <input
                              type="text"
                              className={`form-control ${
                                touched.evaluatorSecLicense &&
                                errors.evaluatorSecLicense
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="evaluatorSecLicense"
                              value={values.evaluatorSecLicense}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter SEC Registration License Number"
                            />

                            <i className="text-muted fs-7">
                              Evaluator’s SEC registration license number
                            </i>

                            {touched.evaluatorSecLicense &&
                              errors.evaluatorSecLicense && (
                                <div className="invalid-feedback">
                                  {errors.evaluatorSecLicense}
                                </div>
                              )}
                          </div>

                          {/* Evaluation Date */}
                          <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              Date of Evaluation
                            </label>

                            <input
                              type="date"
                              className={`form-control ${
                                touched.evaluationDate && errors.evaluationDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="evaluationDate"
                              value={values.evaluationDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            <small className="text-muted">
                              Date when the Qualified Buyer evaluation was
                              conducted.
                            </small>

                            {touched.evaluationDate &&
                              errors.evaluationDate && (
                                <div className="invalid-feedback">
                                  {errors.evaluationDate}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================= SUPPORTING DOCUMENTS ================= */}

                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-light">
                        <h5 className="fw-bold mb-0">Supporting Documents</h5>
                      </div>

                      <div className="card-body">
                        <p className="text-muted mb-4">
                          Upload all required supporting documents in PDF
                          format. Each file must not exceed 10 MB.
                        </p>

                        <div className="row">
                          {/* SEC FORM 39 QB */}
                          <div className="col-md-6 mb-4">
                            <div className="card h-100 border">
                              <div className="card-body">
                                <label className="form-label fw-semibold">
                                  SEC Form 39-Registrar-QB
                                </label>

                                <input
                                  type="file"
                                  className={`form-control ${
                                    touched.secForm39Qb && errors.secForm39Qb
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  accept=".pdf"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "secForm39Qb",
                                      e.currentTarget.files[0],
                                    )
                                  }
                                />

                                {touched.secForm39Qb && errors.secForm39Qb && (
                                  <div className="invalid-feedback">
                                    {errors.secForm39Qb}
                                  </div>
                                )}

                                <small className="text-muted">
                                  Upload the accomplished SEC Form
                                  39-Registrar-QB (PDF only, maximum of 10 MB).
                                </small>
                              </div>
                            </div>
                          </div>

                          {/* Letter of Undertaking */}
                          <div className="col-md-6 mb-4">
                            <div className="card h-100 border">
                              <div className="card-body">
                                <label className="form-label fw-semibold">
                                  Letter of Undertaking
                                </label>

                                <input
                                  type="file"
                                  className={`form-control ${
                                    touched.letterOfUndertaking &&
                                    errors.letterOfUndertaking
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  accept=".pdf"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "letterOfUndertaking",
                                      e.currentTarget.files[0],
                                    )
                                  }
                                />

                                {touched.letterOfUndertaking &&
                                  errors.letterOfUndertaking && (
                                    <div className="invalid-feedback">
                                      {errors.letterOfUndertaking}
                                    </div>
                                  )}

                                <small className="text-muted">
                                  Upload the signed Letter of Undertaking (PDF
                                  only, maximum of 10 MB).
                                </small>
                              </div>
                            </div>
                          </div>

                          {/* SEC FORM 39 AR */}
                          <div className="col-md-6 mb-4">
                            <div className="card h-100 border">
                              <div className="card-body">
                                <label className="form-label fw-semibold">
                                  SEC Form 39-Registrar-AR
                                </label>

                                <input
                                  type="file"
                                  className={`form-control ${
                                    touched.secForm39RegsAr &&
                                    errors.secForm39RegsAr
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  accept=".pdf"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "secForm39RegsAr",
                                      e.currentTarget.files[0],
                                    )
                                  }
                                />

                                {touched.secForm39RegsAr &&
                                  errors.secForm39RegsAr && (
                                    <div className="invalid-feedback">
                                      {errors.secForm39RegsAr}
                                    </div>
                                  )}

                                <small className="text-muted">
                                  Upload the accomplished SEC Form
                                  39-Registrar-AR (PDF only, maximum of 10 MB).
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="reset"
                        className="btn btn-outline-secondary"
                      >
                        Reset
                      </button>

                      <button
                        type="submit"
                        className="btn btn-success px-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Submitting...
                          </>
                        ) : (
                          "Submit Documents"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SubmissionDocsPortal;
