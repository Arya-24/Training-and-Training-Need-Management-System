import { useState, useEffect } from "react";
import api from "../services/api";

export default function CompetencyForm({
  competency,
  employee,
  department,
  year,
  onClose,
}) {
  const [formData, setFormData] = useState({
    employee_name: employee || "",
    department: department || "",
    year: year || "2026",

    training_topic: "",
    required_level: 3,
    self_level: 3,
    hod_level: 3,
  });

  useEffect(() => {
    if (competency) {
      setFormData({
        employee_name: competency.employee_name,
        department: competency.department,
        year: competency.year,
        training_topic: competency.training_topic,
        required_level: competency.required_level,
        self_level: competency.self_level,
        hod_level: competency.hod_level,
      });
    }
  }, [competency]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (competency) {
        await api.put(
          `/competency/${competency.id}`,
          formData
        );

        alert("Competency updated successfully!");
      } else {
        await api.post("/competency", formData);

        alert("Competency added successfully!");
      }

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed to save competency.");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>
            {competency
              ? "Edit Training Topic"
              : "Add Training Topic"}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            name="training_topic"
            placeholder="Training Topic"
            value={formData.training_topic}
            onChange={handleChange}
            required
          />

          <label>Required Level</label>

          <select
            name="required_level"
            value={formData.required_level}
            onChange={handleChange}
          >
            {[1,2,3,4,5].map(level=>(
              <option key={level}>{level}</option>
            ))}
          </select>

          <label>Self Level</label>

          <select
            name="self_level"
            value={formData.self_level}
            onChange={handleChange}
          >
            {[1,2,3,4,5].map(level=>(
              <option key={level}>{level}</option>
            ))}
          </select>

          <label>HOD Level</label>

          <select
            name="hod_level"
            value={formData.hod_level}
            onChange={handleChange}
          >
            {[1,2,3,4,5].map(level=>(
              <option key={level}>{level}</option>
            ))}
          </select>

          <div className="modal-buttons">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              {competency
                ? "Save Changes"
                : "Add Topic"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}