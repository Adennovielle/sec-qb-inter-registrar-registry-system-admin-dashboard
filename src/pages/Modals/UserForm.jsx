import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

export default function UserForm({ mode = "create", user = null, onSuccess }) {
  const isEdit = mode === "edit";
  const validationSchema = Yup.object({
    registrar_id: Yup.string(),
    username: Yup.string().required("Username is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: isEdit
      ? Yup.string().min(4, "Password must be at least 4 characters.")
      : Yup.string()
          .required("Password is required.")
          .min(4, "Password must be at least 4 characters."),
    role: Yup.string().required("Role is required."),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        registrar_id: values.registrar_id || null,
        username: values.username,
        email: values.email,
        role: values.role,
      };

      // password lang kapag may laman
      if (values.password) {
        payload.password = values.password;
      }

      let response;

      if (isEdit) {
        response = await axios.put(
          `http://localhost:8080/auth/users/${user.id}`,
          payload,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          },
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/auth/create-user",
          payload,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          },
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        confirmButtonColor: "#198754",
      });

      resetForm();

      if (onSuccess) {
        await onSuccess();
      }

      const modal = Modal.getInstance(document.querySelector(".modal.show"));

      modal?.hide();

      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        registrar_id: user?.registrar_id || "",
        username: user?.username || "",
        email: user?.email || "",
        password: "",
        role: user?.role || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
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
              placeholder={isEdit ? "Leave blank to keep current password" : ""}
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
              {isEdit ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
