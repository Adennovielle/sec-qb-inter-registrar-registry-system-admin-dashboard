import React, { useRef, useState } from "react";
import "./SubmissionPortal.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const SubmissionPortal = () => {
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const registrars = [
    { id: 1, name: "LANDBANK" },
    { id: 2, name: "PNB" },
    { id: 3, name: "BPI" },
  ];

  const documentTypes = [
    {
      value: "FORM39_QB",
      label: "SEC Form 39-Registrar-QB",
    },
    {
      value: "ANNUAL_ATTESTATION",
      label: "Annual Attestation of QBs' Continued Compliance",
    },
    {
      value: "ANNUAL_REPORT",
      label: "SEC Form 39-Registrar-Annual Report",
    },
  ];

  const initialValues = {
    registrar_id: "",
    submission_type: "",
    file: null,
  };

  const submissionSchema = Yup.object({
    registrar_id: Yup.string().required("Registrar is required."),

    submission_type: Yup.string().required("Document type is required."),

    file: Yup.mixed()
      .required("Please upload a PDF.")
      .test(
        "fileType",
        "Only PDF files are allowed.",
        (value) => value && value.type === "application/pdf",
      )
      .test(
        "fileSize",
        "File must not exceed 10 MB.",
        (value) => value && value.size <= 10 * 1024 * 1024,
      ),
  });

  return (
    <section id="submissionPortal" className="py-5">
      <Formik
        initialValues={initialValues}
        validationSchema={submissionSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const formData = new FormData();
            const referenceNo = `SEC-${new Date().getFullYear()}-${Date.now()}`;

            formData.append("registrar_id", values.registrar_id);
            formData.append("submission_reference_no", referenceNo);
            formData.append("submission_type", values.submission_type);
            formData.append("file", values.file);

            // Loading Alert
            Swal.fire({
              title: "Uploading...",
              text: "Please wait while your document is being uploaded.",
              allowOutsideClick: false,
              allowEscapeKey: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });

            const response = await axios.post(
              "http://localhost:8080/submissions",
              formData,
              {
                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                },

                onUploadProgress: (progressEvent) => {
                  const percent = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                  );

                  setUploadProgress(percent);
                },
              },
            );

            setUploadProgress(100);

            Swal.fire({
              icon: "success",
              title: "Success!",
              text: response.data.message,
            });

            // Reset Formik values
            resetForm();

            // Reset Progress Bar
            setUploadProgress(0);

            // Clear actual file input
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          } catch (err) {
            console.error(err);

            // Error Alert
            Swal.fire({
              icon: "error",
              title: "Submission Failed",
              text: err.response?.data?.message || "Something went wrong.",
            });
          }
        }}
      >
        {({ values, setFieldValue, resetForm }) => {
          const previewFileName = values.file
            ? values.file.name
            : "Upload File";

          return (
            <Form className="container d-flex align-items-center justify-content-center">
              <div className="card shadow border-0 rounded-4">
                <div className="card-body ">
                  {/* Header */}
                  <h4 className="fw-bold mb-1">Submission Portal</h4>

                  <p className="text-secondary mb-4 fs-6 text-start">
                    Qualified Buyer Inter-Registrar Registry – Securities and
                    Exchange Commission
                  </p>

                  {/* Registrar Name */}
                  <div className="mb-4 ">
                    <label className="form-label fw-semibold">
                      Registrar Name
                    </label>
                    <Field
                      as="select"
                      name="registrar_id"
                      className="form-select"
                    >
                      <option value="">Select Registrar</option>

                      {registrars.map((registrar) => (
                        <option key={registrar.id} value={registrar.id}>
                          {registrar.name}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="registrar_id"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Submission Type */}
                  <div className="mb-4 ">
                    <label className="form-label fw-semibold">
                      Submission Type
                    </label>
                    <Field
                      as="select"
                      name="submission_type"
                      className="form-select"
                    >
                      <option value="">-- Select Submission Type --</option>

                      {documentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="submission_type"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                  {/* File Upload */}
                  <div className="mb-2">
                    <label className="form-label fw-semibold">
                      Upload PDF (Max 10 MB)
                    </label>

                    {/* <input className="form-control" type="file" accept=".pdf" /> */}
                    <input
                      className="form-control"
                      type="file"
                      ref={fileInputRef}
                      name="fileUpload"
                      accept=".pdf"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                    />

                    <ErrorMessage
                      name="file"
                      component="div"
                      className="text-danger small"
                    />

                    <ErrorMessage
                      name="submission_type"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <small className="text-secondary fst-italic">
                    File will be saved as:
                    <br />
                    <strong>{previewFileName}</strong>
                  </small>

                  {/* Progress */}
                  {/* <div className="progress my-4" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: "70%" }}
                    ></div>
                  </div> */}
                  {uploadProgress > 0 && (
                    <div className="progress my-4" style={{ height: "20px" }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success px-4">
                      Submit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={resetForm}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default SubmissionPortal;
