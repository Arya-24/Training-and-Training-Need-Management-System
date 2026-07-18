import { useState, useEffect } from "react";
import api from "../services/api";

export default function DepartmentForm({ department, onClose }) {
  const [formData, setFormData] = useState({
    department_id: "",
    department_name: "",
    hod: "",
    employees: 0,
    budget: "",
    description: "",
  });

  useEffect(() => {
    if (department) {
      setFormData(department);
    }
  }, [department]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (department) {
        await api.put(`/departments/${department.id}`, formData);
      } else {
        await api.post("/departments", formData);
      }

      alert(
        department
          ? "Department updated successfully!"
          : "Department added successfully!"
      );

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save department.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>
            {department ? "Edit Department" : "Add Department"}
          </h2>

          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            name="department_id"
            placeholder="Department ID"
            value={formData.department_id}
            onChange={handleChange}
            required
          />

          <input
            name="department_name"
            placeholder="Department Name"
            value={formData.department_name}
            onChange={handleChange}
            required
          />

          <input
            name="hod"
            placeholder="HOD"
            value={formData.hod}
            onChange={handleChange}
          />

          <input
            type="number"
            name="employees"
            placeholder="Employees"
            value={formData.employees}
            onChange={handleChange}
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              {department ? "Save Changes" : "Save"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}