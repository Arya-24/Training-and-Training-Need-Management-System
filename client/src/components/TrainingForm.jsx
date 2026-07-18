import { useState, useEffect } from "react";
import api from "../services/api";

export default function TrainingForm({ training, onClose }) {
  const [formData, setFormData] = useState({
    training_id: "",
    title: "",
    category: "Safety",
    duration: "",
    status: "Active",
    description: "",
  });

  useEffect(() => {
    if (training) {
      setFormData({
        training_id: training.training_id || "",
        title: training.title || "",
        category: training.category || "Safety",
        duration: training.duration || "",
        status: training.status || "Active",
        description: training.description || "",
      });
    }
  }, [training]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (training) {
        await api.put(`/trainings/${training.id}`, formData);

        alert("Course updated successfully!");
      } else {
        await api.post("/trainings", formData);

        alert("Course created successfully!");
      }

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed to save course.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>
            {training ? "Edit Course" : "New Course"}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="training_id"
            placeholder="Training ID"
            value={formData.training_id}
            onChange={handleChange}
            required
          />

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Safety</option>
            <option>Process</option>
            <option>Quality</option>
            <option>Production</option>
          </select>

          <input
            name="duration"
            placeholder="Duration (Example: 8h)"
            value={formData.duration}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

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
              {training ? "Save Changes" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
