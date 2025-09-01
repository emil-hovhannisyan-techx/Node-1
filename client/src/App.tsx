import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

interface Student {
  id: string;
  name: string;
}

interface Class {
  id: string;
  name: string;
}

function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/students");
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!newName) return;
    await axios.post("/students", { name: newName });
    setNewName("");
    fetchStudents();
  };

  const deleteStudent = async (id: string) => {
    await axios.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <h2>Students</h2>
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New student name"
      />
      <button onClick={addStudent}>Add Student</button>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} <button onClick={() => deleteStudent(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await axios.get("/classes");
    setClasses(res.data);
  };

  const addClass = async () => {
    if (!newName) return;
    await axios.post("/classes", { name: newName });
    setNewName("");
    fetchClasses();
  };

  const deleteClass = async (id: string) => {
    await axios.delete(`/classes/${id}`);
    fetchClasses();
  };

  return (
    <div>
      <h2>Classes</h2>
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New class name"
      />
      <button onClick={addClass}>Add Class</button>
      <ul>
        {classes.map((c) => (
          <li key={c.id}>
            {c.name} <button onClick={() => deleteClass(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/students">Students</Link> |{" "}
        <Link to="/classes">Classes</Link>
      </nav>
      <Routes>
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/classes" element={<ClassesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
