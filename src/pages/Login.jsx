import { useState, useContext } from "react";
import { MdAccountBalance } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    // TODO:
    axios.post("http://localhost:8080/auth/login", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data);
        setAuthState(true);
        navigate("/");
      }
    });
  };

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

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>

                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn text-white fw-semibold w-100 py-2"
                style={{
                  backgroundColor: "rgb(1, 71, 47)",
                  borderColor: "rgb(1, 71, 47)",
                }}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
