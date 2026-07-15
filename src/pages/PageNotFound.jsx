import React from "react";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const PageNotFound = () => {
  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f5f7f9" }}
    >
      <div className="text-center">
        <div
          className="d-inline-flex justify-content-center align-items-center rounded-circle text-white mb-4"
          style={{
            width: "110px",
            height: "110px",
            backgroundColor: "rgb(1, 71, 47)",
          }}
        >
          <MdErrorOutline size={60} />
        </div>

        <h1
          className="display-1 fw-bold mb-0"
          style={{ color: "rgb(1, 71, 47)" }}
        >
          404
        </h1>

        <h3 className="fw-semibold mt-3">Page Not Found</h3>

        <p className="text-muted mx-auto mb-4" style={{ maxWidth: "500px" }}>
          The page you are looking for doesn't exist, may have been moved, or
          the URL you entered is incorrect.
        </p>

        <Link
          to="/"
          className="btn btn-lg text-white px-4"
          style={{
            backgroundColor: "rgb(1, 71, 47)",
            borderColor: "rgb(1, 71, 47)",
          }}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
