import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

interface Class {
  id: string;
  name: string;
}

function ClassesPage() {
  const classes = useLoaderData() as Class[];
  const [newName, setNewName] = useState("");

  const addClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    await axios.post("/classes", { name: newName });
    setNewName("");
    window.location.reload();
  };

  const deleteClass = async (id: string) => {
    await axios.delete(`/classes/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <h2>Classes</h2>
      <form onSubmit={addClass} className="input-group">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New class name"
          required
        />
        <button type="submit">Add Class</button>
      </form>
      <div className="card-container">
        {classes.map((c) => (
          <div key={c.id} className="card">
            <span>{c.name}</span>
            <button onClick={() => deleteClass(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassesPage;
