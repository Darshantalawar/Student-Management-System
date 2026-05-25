import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");

  const [age, setAge] = useState("");

  const [editId, setEditId] = useState(null);

  // Fetch students
  const getStudents = async () => {

    const response = await axios.get(
      "http://localhost:8081/students"
    );

    setStudents(response.data);
  };

  // Add or Update
  const saveStudent = async () => {

    const student = {
      name,
      age
    };

    // UPDATE
    if (editId) {

      await axios.put(
        `http://localhost:8081/students/${editId}`,
        student
      );

      setEditId(null);

    } else {

      // CREATE
      await axios.post(
        "http://localhost:8081/students",
        student
      );
    }

    setName("");
    setAge("");

    getStudents();
  };

  // DELETE
  const deleteStudent = async (id) => {

    await axios.delete(
      `http://localhost:8081/students/${id}`
    );

    getStudents();
  };

  // EDIT
  const editStudent = (student) => {

    setName(student.name);

    setAge(student.age);

    setEditId(student.id);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <h1>School Management System</h1>
      </div>

      {/* Form */}
      <div style={styles.card}>
        <h2>
          {editId ? "Update Student" : "Add Student"}
        </h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={saveStudent}
        >
          {editId ? "Update Student" : "Add Student"}
        </button>
      </div>

      {/* Table */}
      <div style={styles.card}>
        <h2>Student List</h2>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id}>

                <td style={styles.td}>
                  {student.id}
                </td>

                <td style={styles.td}>
                  {student.name}
                </td>

                <td style={styles.td}>
                  {student.age}
                </td>

                <td style={styles.td}>

                  <button
                    style={styles.editButton}
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}

const styles = {

  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    fontFamily: "Arial"
  },

  navbar: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },

  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  },

  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    textAlign: "left"
  },

  td: {
    border: "1px solid #ddd",
    padding: "12px"
  },

  editButton: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 12px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};