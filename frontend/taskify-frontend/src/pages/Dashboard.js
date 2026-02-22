import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingId}`,
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/tasks",
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setEditingId(task._id);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📝 Task Dashboard</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <button style={styles.addBtn}>
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.listItem}>
              <span style={styles.taskText}>{task.title}</span>
              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "28px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 16px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  taskText: {
    fontSize: "16px",
    color: "#333",
  },
  editBtn: {
    marginRight: "8px",
    padding: "5px 10px",
    background: "#facc15",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "5px 10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Dashboard;