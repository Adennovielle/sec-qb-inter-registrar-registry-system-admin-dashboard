import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  registrar_name: Yup.string().required("Registrar name is required"),
  principal_address: Yup.string().required("Principal address is required"),
  contact_number: Yup.string().required("Contact number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  website: Yup.string(),
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string(),
  last_name: Yup.string().required("Last name is required"),
  suffix: Yup.string(),
  qbid: Yup.string().required("QBID is required"),
  registration_date: Yup.date().required("Registration date is required"),
  validity_date: Yup.date().required("Validity date is required"),
  certificate_no: Yup.string().required("Certificate number is required"),
  cor_control_number: Yup.string().required("COR Control Number is required"),
  qb_status: Yup.string().required("QB Status is required"),
  qb_type: Yup.string().required("QB Type is required"),
  evaluator_name: Yup.string().required("Evaluator name is required"),
  designation: Yup.string().required("Designation is required"),
  sec_license_no: Yup.string(),
  evaluation_date: Yup.date().required("Evaluation date is required"),
});

const CreateQualifiedBuyerModal = () => {
  const formik = useFormik({
    initialValues: {
      registrar_name: "",
      principal_address: "",
      contact_number: "",
      email: "",
      website: "",

      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",

      qbid: "",
      registration_date: "",
      validity_date: "",
      certificate_no: "",
      cor_control_number: "",

      qb_status: "",

      qb_type: "",

      evaluator_name: "",
      designation: "",
      sec_license_no: "",
      evaluation_date: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      console.log(values);

      // axios.post(...)
    },
  });

  return (
    <div className="modal fade " id="createQBModal" tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable ">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Create Qualified Buyer</h4>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body">
              {/* Registrar Information */}
              <div className="card mb-4">
                <div className="card-header bg-success text-white">
                  Registrar Information
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Registrar Name</label>
                      <input
                        type="text"
                        name="registrar_name"
                        className={`form-control ${
                          formik.touched.registrar_name &&
                          formik.errors.registrar_name
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.registrar_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <div className="invalid-feedback">
                        {formik.touched.registrar_name &&
                          formik.errors.registrar_name}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Principal Address</label>
                      <input
                        type="text"
                        name="principal_address"
                        className={`form-control ${
                          formik.touched.principal_address &&
                          formik.errors.principal_address
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.principal_address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <div className="invalid-feedback">
                        {formik.touched.principal_address &&
                          formik.errors.principal_address}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Contact Number</label>
                      <input
                        type="text"
                        name="contact_number"
                        className={`form-control ${
                          formik.touched.contact_number &&
                          formik.errors.contact_number
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.contact_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <div className="invalid-feedback">
                        {formik.touched.contact_number &&
                          formik.errors.contact_number}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        name="email"
                        className={`form-control ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <div className="invalid-feedback">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Website</label>
                      <input
                        type="text"
                        name="website"
                        className={`form-control ${
                          formik.touched.website && formik.errors.website
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <div className="invalid-feedback">
                        {formik.touched.website && formik.errors.website}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QB Information */}
              <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                  Qualified Buyer Information
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        className={`form-control ${
                          formik.touched.first_name && formik.errors.first_name
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <div className="invalid-feedback">
                        {formik.touched.first_name && formik.errors.first_name}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Middle Name</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Last Name</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Suffix</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">QBID</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Registration Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Validity Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Certificate Number</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">COR Control Number</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">QB Status</label>
                      <select
                        name="qb_status"
                        className="form-select"
                        value={formik.values.qb_status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="EXPIRED">EXPIRED</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">QB Type</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="qbTypeIndividual"
                            name="qb_type"
                            value="Individual"
                            checked={formik.values.qb_type === "Individual"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />

                          <label
                            htmlFor="qbTypeIndividual"
                            className="form-check-label"
                          >
                            Individual
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="qb_type"
                            value="Institutional"
                            checked={formik.values.qb_type === "Institutional"}
                            onChange={formik.handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="qbTypeInstitutional"
                          >
                            Institutional
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation */}
              <div className="card">
                <div className="card-header bg-dark text-white">
                  Registrar Evaluator Details
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Evaluator Name</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Designation</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">SEC License No.</label>
                      <input className="form-control" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Evaluation Date</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQualifiedBuyerModal;
