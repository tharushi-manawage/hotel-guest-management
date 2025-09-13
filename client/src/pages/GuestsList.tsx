import React, { useEffect, useState } from "react";
import pb from "../pb";
import { Guest } from "../types";
import { Link } from "react-router-dom";

export default function GuestsList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    try {
      const all = await pb.collection("guests").getFullList({ sort: "-created" });
      setGuests(all as unknown as Guest[]);
    } catch (err) {
      console.error("Failed to load guests", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guest?")) return;
    try {
      await pb.collection("guests").delete(id);
      setGuests(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed. See console.");
    }
  };

  const filtered = guests.filter(g =>
    `${g.first_name} ${g.last_name} ${g.email}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or email..."
          className="border p-2 rounded w-80"
        />
        <Link to="/guests/new" className="bg-blue-600 text-white px-4 py-2 rounded">Add Guest</Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.id} className="border-b">
                <td className="py-2">{g.first_name} {g.last_name}</td>
                <td>{g.email}</td>
                <td>{g.phone || "-"}</td>
                <td>{g.date_of_birth || "-"}</td>
                <td className="space-x-2">
                  <Link to={`/guests/${g.id}`} className="text-blue-600 underline">View/Edit</Link>
                  <button onClick={() => handleDelete(g.id)} className="text-red-600 underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}