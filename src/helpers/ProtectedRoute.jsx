import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { MdAccountBalance } from "react-icons/md";

const ProtectedRoute = () => {
  const { authState, loading, setLoading } = useContext(AuthContext);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f7f9",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border mb-3"
            role="status"
            style={{
              color: "rgb(1, 71, 47)",
              width: "3rem",
              height: "3rem",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>

          <h4 className="fw-bold mb-2" style={{ color: "rgb(1, 71, 47)" }}>
            SEC Inter-Registrar Registry System
          </h4>

          <p className="text-muted mb-0">Verifying your session...</p>
        </div>
      </div>
    );
  }

  if (!authState.status) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
