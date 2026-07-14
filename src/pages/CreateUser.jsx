import { Formik } from "formik";
import * as Yup from "yup";
import { FaShieldAlt } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import axios from "axios";

const loginSchema = Yup.object({
  username: Yup.string().required("Username is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(4, "Password must be at least 4 characters."),
});

const handleSubmit = (data) => {
  axios.post("http://localhost:8080/auth/create-user", data).then(() => {
    console.log(data);
  });
};

export default function Login() {
  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f5f7f9" }}
    >
      <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">
        <div
          className="card border-0 shadow-lg rounded-4"
          style={{ borderTop: "6px solid rgb(1, 71, 47)" }}
        >
          <div className="card-body p-5">
            {/* Header */}
            <div className="text-center mb-4">
              <div
                className="rounded-circle d-inline-flex justify-content-center align-items-center text-white mb-3"
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "rgb(1, 71, 47)",
                }}
              >
                <MdAccountBalance size={40} />
              </div>

              <div className="text-uppercase small fw-semibold text-secondary">
                SEC • Registry Operations
              </div>

              <h2 className="fw-bold mt-2" style={{ color: "rgb(1, 71, 47)" }}>
                IRR System
              </h2>

              <p className="text-muted">
                Sign in using your assigned username and password.
              </p>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
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
                  {/* Username */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>

                    <input
                      type="text"
                      name="username"
                      className={`form-control form-control-lg ${
                        touched.username && errors.username ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your username"
                      autoComplete="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {touched.username && errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>

                    <input
                      type="password"
                      name="password"
                      className={`form-control form-control-lg ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {touched.password && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn text-white fw-semibold w-100 py-2"
                    style={{
                      backgroundColor: "rgb(1, 71, 47)",
                      borderColor: "rgb(1, 71, 47)",
                    }}
                    disabled={isSubmitting}
                  >
                    Create
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
