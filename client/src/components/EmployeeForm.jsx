import { useState } from "react";
import api from "../services/api";

export default function EmployeeForm({ employee, onClose }) {
  const [formData, setFormData] = useState(
    employee || {
      employee_id: "",
      name: "",
      designation: "",
      manager: "",
      department: "",
      status: "Active",
      joining_date: "",
      contact_number: "",
      date_of_birth: "",
      rating: "",

      // Professional Details
      education: "",
      company_experience: "",
      total_experience: "",
      matrix_status: "Draft",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.employee_id ||
      !formData.name ||
      !formData.designation ||
      !formData.manager ||
      !formData.department ||
      !formData.joining_date ||
      !formData.contact_number ||
      !formData.date_of_birth ||
      !formData.rating
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (employee) {
        await api.put(`/employees/${employee.id}`, formData);
        alert("Employee updated successfully!");
      } else {
        await api.post("/employees", formData);
        alert("Employee added successfully!");
      }

      onClose();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="employee-modal">

        <div className="modal-header">
          <h2>
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Employee ID */}

            <div className="form-group">
              <label>Employee ID *</label>

              <input
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
              />
            </div>

            {/* Name */}

            <div className="form-group">
              <label>Full Name *</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Designation */}

            <div className="form-group">
              <label>Designation *</label>

              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Senior Polymer Scientist</option>
                <option>Line Supervisor</option>
                <option>QC Analyst</option>
                <option>Procurement Lead</option>
                <option>Reliability Engineer</option>
                <option>Process Chemist</option>
                <option>HR Business Partner</option>
                <option>Extrusion Operator</option>
              </select>
            </div>

            {/* Manager */}

            <div className="form-group">
              <label>Manager *</label>

              <select
                name="manager"
                value={formData.manager}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>R. Krishnan</option>
                <option>S. Pillai</option>
                <option>Neha Bhatt</option>
                <option>L. Iyer</option>
                <option>Vikas D.</option>
                <option>HR Admin</option>
              </select>
            </div>

            {/* Department */}

            <div className="form-group">
              <label>Department *</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Polymer R&D</option>
                <option>Production</option>
                <option>Quality Control</option>
                <option>Supply Chain</option>
                <option>Maintenance</option>
                <option>HR & Admin</option>
              </select>
            </div>

            {/* Status */}

            <div className="form-group">
              <label>Status *</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
              </select>
            </div>

            {/* Joining Date */}

            <div className="form-group">
              <label>Joining Date *</label>

              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
              />
            </div>

            {/* Contact */}

            <div className="form-group">
              <label>Contact Number *</label>

              <input
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
              />
            </div>

            {/* DOB */}

            <div className="form-group">
              <label>Date of Birth *</label>

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            {/* Rating */}

            <div className="form-group">
              <label>Rating *</label>

              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            {/* -------- Professional Details -------- */}

            <div className="form-group">
              <label>Education</label>

              <input
                name="education"
                placeholder="B.Tech Polymer Engineering"
                value={formData.education}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Company Experience</label>

              <input
                name="company_experience"
                placeholder="Example: 7y 3m"
                value={formData.company_experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Total Experience</label>

              <input
                name="total_experience"
                placeholder="Example: 8 Years"
                value={formData.total_experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Matrix Status</label>

              <select
                name="matrix_status"
                value={formData.matrix_status}
                onChange={handleChange}
              >
                <option>Draft</option>
                <option>Approved</option>
                <option>Completed</option>
              </select>
            </div>

          </div>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {employee ? "Save Changes" : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}