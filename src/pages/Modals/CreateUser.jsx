import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const createUserSchema = Yup.object({
  registrar_id: Yup.string().required("Registrar is required."),
  username: Yup.string().required("Username is required."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(4, "Password must be at least 4 characters."),
  role: Yup.string().required("Role is required."),
});

const handleCreateUser = async (values, { resetForm, setSubmitting }) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/create-user",
      values,
    );

    await Swal.fire({
      icon: "success",
      title: "Success!",
      text: response.data.message,
      confirmButtonColor: "#198754",
    });

    resetForm();

    setSubmitting(false);

    // Close Bootstrap Modal
    document.querySelector("[data-bs-dismiss='modal']")?.click();
  } catch (err) {
    setSubmitting(false);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response?.data?.message || "Something went wrong.",
      confirmButtonColor: "#dc3545",
    });
  }
};

export default function CreateUser() {
  return (
    <Formik
      initialValues={{
        registrar_id: "",
        username: "",
        email: "",
        password: "",
        role: "",
      }}
      validationSchema={createUserSchema}
      onSubmit={handleCreateUser}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          {/* Registrar */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Registrar</label>

            <select
              name="registrar_id"
              className={`form-select ${
                touched.registrar_id && errors.registrar_id ? "is-invalid" : ""
              }`}
              value={values.registrar_id}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Registrar</option>
              <option value="1">LANDBANK</option>
              <option value="2">PNB</option>
              <option value="3">BPI</option>
            </select>

            <div className="invalid-feedback">{errors.registrar_id}</div>
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>

            <input
              type="text"
              name="username"
              className={`form-control ${
                touched.username && errors.username ? "is-invalid" : ""
              }`}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="invalid-feedback">{errors.username}</div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>

            <input
              type="email"
              name="email"
              className={`form-control ${
                touched.email && errors.email ? "is-invalid" : ""
              }`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="invalid-feedback">{errors.email}</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <input
              type="password"
              name="password"
              className={`form-control ${
                touched.password && errors.password ? "is-invalid" : ""
              }`}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="invalid-feedback">{errors.password}</div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Role</label>

            <select
              name="role"
              className={`form-select ${
                touched.role && errors.role ? "is-invalid" : ""
              }`}
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="registrar">Registrar</option>
            </select>

            <div className="invalid-feedback">{errors.role}</div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Create User
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
