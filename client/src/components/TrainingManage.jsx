import { useEffect, useState } from "react";
import api from "../services/api";

export default function TrainingManage({ training, onClose }) {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const fetchAssignments = async () => {
    try {
      const res = await api.get(
        `/employee-training/${training.title}`
      );

      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");

      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchEmployees();
  }, []);

  const assignEmployee = async () => {
    if (!selectedEmployee) {
      alert("Select an employee");
      return;
    }

    try {
      await api.post("/employee-training", {
        employee_name: selectedEmployee,
        training_title: training.title,
        progress: 0,
        proficiency: 0,
      });

      fetchAssignments();

      setSelectedEmployee("");
    } catch (err) {
      console.error(err);
      alert("Assignment failed");
    }
  };

  const saveRecord = async (record) => {
    try {
      await api.put(`/employee-training/${record.id}`, record);

      alert("Updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete assignment?")) return;

    try {
      await api.delete(`/employee-training/${id}`);

      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        style={{ width: "850px" }}
      >
        <div className="modal-header">
          <h2>{training.title}</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <p>
          Assign employees, track progress,
          and record proficiency ratings.
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "20px 0",
          }}
        >
          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(e.target.value)
            }
          >
            <option value="">
              Select employee...
            </option>

            {employees.map((emp) => (
              <option
                key={emp.id}
                value={emp.name}
              >
                {emp.name}
              </option>
            ))}
          </select>

          <button
            className="add-btn"
            onClick={assignEmployee}
          >
            Assign
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Progress</th>
              <th>Proficiency</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.employee_name}</td>

                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={record.progress}
                    onChange={(e) => {
                      const updated = [...records];

                      updated.find(
                        (r) => r.id === record.id
                      ).progress = Number(e.target.value);

                      setRecords(updated);
                    }}
                  />
                </td>

                <td>
                  <select
                    value={record.proficiency}
                    onChange={(e) => {
                      const updated = [...records];

                      updated.find(
                        (r) => r.id === record.id
                      ).proficiency = Number(e.target.value);

                      setRecords(updated);
                    }}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => saveRecord(record)}
                  >
                    Save
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteRecord(record.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No employees assigned
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}