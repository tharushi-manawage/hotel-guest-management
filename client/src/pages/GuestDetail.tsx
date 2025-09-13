import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pb from "../pb";
import { Guest } from "../types";

export default function GuestDetail() {
  const { id } = useParams<{ id: string }>();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const g = await pb.collection("guests").getOne(id);
        setGuest(g as unknown as Guest);
      } catch (err) {
        console.error(err);
        alert("Failed to load guest");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!guest) return <p>No guest found</p>;

  const updateField = (k: keyof Guest, v: any) => setGuest({ ...guest, [k]: v } as Guest);

  const handleSave = async () => {
    setSaving(true);
    try {
      await pb.collection("guests").update(guest!.id, {
        first_name: guest!.first_name,
        last_name: guest!.last_name,
        email: guest!.email,
        phone: guest!.phone,
        address: guest!.address,
        date_of_birth: guest!.date_of_birth
      });
      alert("Saved");
      navigate("/guests");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <div>
        <label className="block text-sm">First name</label>
        <input value={guest.first_name || ""} onChange={e => updateField("first_name", e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label className="block text-sm">Last name</label>
        <input value={guest.last_name || ""} onChange={e => updateField("last_name", e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input value={guest.email || ""} onChange={e => updateField("email", e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label className="block text-sm">Phone</label>
        <input value={guest.phone || ""} onChange={e => updateField("phone", e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label className="block text-sm">Address</label>
        <textarea value={guest.address || ""} onChange={e => updateField("address", e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <label className="block text-sm">Date of birth</label>
        <input type="date" value={guest.date_of_birth || ""} onChange={e => updateField("date_of_birth", e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div>
        <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}