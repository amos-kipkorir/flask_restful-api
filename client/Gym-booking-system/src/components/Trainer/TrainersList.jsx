import { useEffect, useState } from "react";

export default function TrainersList({ refreshFlag, onUpdated }) {
  const [trainers, setTrainers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch("/trainers")
      .then((r) => r.json())
      .then(setTrainers)
      .catch((err) => console.error("Error loading trainers:", err));
  }, [refreshFlag]);

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;

    fetch(`/trainers/${id}`, { method: "DELETE" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to delete trainer");
        setTrainers(trainers.filter((t) => t.id !== id));
        onUpdated();
      })
      .catch((err) => alert(err));
  }

  function startEdit(trainer) {
    setEditingId(trainer.id);
    setEditForm({ ...trainer });
  }

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    fetch(`/trainers/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to update trainer");
        return r.json();
      })
      .then((updatedTrainer) => {
        setTrainers(trainers.map(t => t.id === editingId ? updatedTrainer : t));
        setEditingId(null);
        onUpdated();
      })
      .catch((err) => alert(err));
  }

  return (
    <div>
      <h2>Trainers</h2>
      {trainers.length === 0 ? (
        <p>No trainers yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {trainers.map((t) => (
            <li key={t.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
              {editingId === t.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    name="specialization"
                    value={editForm.specialization}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    name="phone_number"
                    value={editForm.phone_number}
                    onChange={handleEditChange}
                    required
                  />
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    rows="2"
                    required
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <strong>{t.name}</strong> — {t.specialization}
                  <br />
                  {t.bio} | {t.phone_number}
                  <br />
                  <button onClick={() => startEdit(t)}>Edit</button>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
