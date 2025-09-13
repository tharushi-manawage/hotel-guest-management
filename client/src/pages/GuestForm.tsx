import React, { useState } from "react";
import pb from "../pb";
import { useNavigate } from "react-router-dom";

export default function GuestForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: ""
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await pb.collection("guests").create(form);
      alert("Guest created");
      navigate("/guests");
    } catch (err: any) {
      console.error(err);
      alert("Failed to create guest: " + (err?.message || "unknown"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <input required placeholder="First name" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})}
               className="border p-2 rounded" />
        <input required placeholder="Last name" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})}
               className="border p-2 rounded" />
      </div>

      <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
             className="border p-2 rounded w-full" />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
             className="border p-2 rounded w-full" />
      <textarea placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                className="border p-2 rounded w-full" />
      <input type="date" value={form.date_of_birth} onChange={e => setForm({...form, date_of_birth: e.target.value})}
             className="border p-2 rounded w-full" />

      <div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={saving}>
          {saving ? "Saving..." : "Create Guest"}
        </button>
      </div>
    </form>
  );
}