import { useState } from "react";
import { useLoaderData, Form } from "react-router-dom";
import axios from "axios";

interface Student {
  id: string;
  name: string;
}

function StudentsPage() {
  const students = useLoaderData() as Student[];
  const [newName, setNewName] = useState("");

  const addStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    await axios.post("/students", { name: newName });
    setNewName("");
    window.location.reload();
  };

  const deleteStudent = async (id: string) => {
    await axios.delete(`/students/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <h2>Students</h2>
      <Form onSubmit={addStudent} className="input-group">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New student name"
          required
        />
        <button type="submit">Add Student</button>
      </Form>
      <div className="card-container">
        {students.map((s) => (
          <div key={s.id} className="card">
            <span>{s.name}</span>
            <button onClick={() => deleteStudent(s.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;
