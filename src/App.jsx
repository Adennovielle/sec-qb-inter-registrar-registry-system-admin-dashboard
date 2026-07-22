import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import QualifiedBuyers from "./pages/QualifiedBuyers";
import Registrars from "./pages/Registrars";
import Transfers from "./pages/Transfers";
import Compliance from "./pages/Compliance";
import AuditLog from "./pages/AuditLog";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import MyRegistry from "./pages//MyRegistry/MyRegistry";
import PageNotFound from "./pages/PageNotFound";
import SubmissionPortal from "./pages/SubmissionPortal/SubmissionPortal";
import Users from "./pages/Users/Users";
import QbIdSearch from "./pages/QbIdSearch/QbIdSearch";
import axios from "axios";
import ProtectedRoute from "./helpers/ProtectedRoute";
import SubmissionDocsPortal from "./pages/SubmissionDocsPortal/SubmissionDocsPortal";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    username: "",
    role: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/validate-token", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({
            username: "",
            role: "",
            id: 0,
            registrar_id: 0,
            status: false,
          });
        } else {
          setAuthState({
            username: res.data.username,
            role: res.data.role,
            id: res.data.id,
            registrar_id: res.data.registrar_id,
            status: true,
          });
        }

        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, loading, setLoading }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              {/* <Route index element={<Dashboard />} /> */}
              <Route index path="/" element={<QbIdSearch />} />
              <Route path="qbid-search" element={<QbIdSearch />} />
              <Route
                path="submission-docs-portal"
                element={<SubmissionDocsPortal />}
              />
              <Route path="my-registry" element={<MyRegistry />} />
              <Route path="submission-portal" element={<SubmissionPortal />} />
              <Route path="users" element={<Users />} />
              {/* <Route path="qualified-buyers" element={<QualifiedBuyers />} /> */}
              {/* <Route path="registrars" element={<Registrars />} /> */}
              {/* <Route path="transfers" element={<Transfers />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="audit-log" element={<AuditLog />} />
              <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/create-user" element={<CreateUser />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
