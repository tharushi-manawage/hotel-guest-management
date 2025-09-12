import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hotel Guest Management</h1>
          <nav className="space-x-4">
            <Link to="/guests" className="text-sm underline">Guests</Link>
            <Link to="/guests/new" className="text-sm underline">Add Guest</Link>
          </nav>
        </div>
        <p className="text-sm text-gray-600 mt-2">Desktop UI — basic CRUD using PocketBase</p>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <Outlet />
      </main>
    </div>
  );
}