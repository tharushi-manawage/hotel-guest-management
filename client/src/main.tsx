// import { StrictMode } from 'react'
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import GuestsList from "./pages/GuestsList";
import GuestForm from "./pages/GuestForm";
import GuestDetail from "./pages/GuestDetail";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/guests" replace />} />
          <Route path="guests" element={<GuestsList />} />
          <Route path="guests/new" element={<GuestForm />} />
          <Route path="guests/:id" element={<GuestDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);