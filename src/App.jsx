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
import CreateUser from "./pages/CreateUser";

export default function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="qualified-buyers" element={<QualifiedBuyers />} />
            <Route path="registrars" element={<Registrars />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="audit-log" element={<AuditLog />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
