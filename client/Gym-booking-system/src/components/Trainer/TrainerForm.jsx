import { useState } from "react";

export default function TrainerForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    specialization: "",
    phone_number: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create trainer");
      await res.json();
      setForm({ name: "", bio: "", specialization: "", phone_number: "" });
      onAdded(); // refresh the list
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Add Trainer</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        placeholder="Specialization"
        required
      />
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Bio"
        rows="3"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Create Trainer"}
      </button>
    </form>
  );
}
