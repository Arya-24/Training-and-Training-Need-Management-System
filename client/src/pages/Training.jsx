import { useEffect, useState } from "react";
import api from "../services/api";
import TrainingForm from "../components/TrainingForm";
import TrainingManage from "../components/TrainingManage";

export default function Training() {
  const [trainings, setTrainings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showManage, setShowManage] = useState(false);

  const fetchTrainings = async () => {
    try {
      const response = await api.get("/trainings");
      setTrainings(response.data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/trainings/${id}`);

      alert("Course deleted successfully!");

      fetchTrainings();
    } catch (error) {
      console.error(error);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="training-page">
      <div className="page-header">
        <h1>Training Management</h1>

        <button
          className="add-btn"
          onClick={() => {
            setSelectedTraining(null);
            setShowModal(true);
          }}
        >
          + New Course
        </button>
      </div>

      <div className="training-grid">
        {trainings.map((training) => (
          <div
            className="training-card"
            key={training.id}
          >
            <div className="training-card-header">
              <span className="category">
                {training.category}
              </span>

              <span className="status">
                {training.status}
              </span>
            </div>

            <h3>{training.title}</h3>

            <p>{training.description}</p>

            <div className="training-info">
              <span>{training.duration}</span>

              <span>{training.training_id}</span>
            </div>

            <div>Completion</div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${training.completion}%`,
                }}
              />
            </div>

            <p>{training.completion}%</p>

            <div className="training-actions">
              <button
  className="manage-btn"
  onClick={() => {
    setSelectedTraining(training);
    setShowManage(true);
  }}
>
  Manage
</button>

              <button
                className="edit-btn"
                onClick={() => {
                  setSelectedTraining(training);
                  setShowModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(
                    training.id,
                    training.title
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <TrainingForm
          training={selectedTraining}
          onClose={() => {
            setShowModal(false);
            setSelectedTraining(null);
            fetchTrainings();
          }}
        />
      )}

      {showManage && (
  <TrainingManage
    training={selectedTraining}
    onClose={() => {
      setShowManage(false);
      setSelectedTraining(null);
    }}
  />
)}
    </div>
  );
}