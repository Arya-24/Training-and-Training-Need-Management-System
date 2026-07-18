import { useState, useEffect } from "react";
import api from "../services/api";
import CompetencyForm from "../components/CompetencyForm";

export default function CompetencyMapping() {
  const [activeTab, setActiveTab] = useState("matrix");
  const [departments, setDepartments] = useState([]);
const [employees, setEmployees] = useState([]);

const [selectedDepartment, setSelectedDepartment] = useState("");
const [selectedEmployee, setSelectedEmployee] = useState("");

const [employeeDetails, setEmployeeDetails] = useState(null);
const [competencies, setCompetencies] = useState([]);
const [selectedYear, setSelectedYear] = useState("2026");

const [showModal, setShowModal] = useState(false);

const [selectedCompetency, setSelectedCompetency] = useState(null);

const fetchDepartments = async () => {
  try {
    const response = await api.get("/departments");
    setDepartments(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchEmployees = async () => {
  try {
    const response = await api.get("/employees");
    setEmployees(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchCompetencies = async (employeeName, year) => {
  if (!employeeName || !year) {
    setCompetencies([]);
    return;
  }

  try {
    const response = await api.get(
      `/competency/${employeeName}/${year}`
    );

    setCompetencies(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchDepartments();
  fetchEmployees();
}, []);

useEffect(() => {
  if (selectedEmployee) {
    fetchCompetencies(selectedEmployee, selectedYear);
  }
}, [selectedEmployee, selectedYear]);

  return (
    <div className="competency-page">

      <div className="page-header">
        <h1>TNI & Competency Mapping</h1>
      </div>

      {/* Tabs */}
      <div className="tabs">

        <button
          className={activeTab === "matrix" ? "active-tab" : ""}
          onClick={() => setActiveTab("matrix")}
        >
          Competency Matrix
        </button>

        <button
          className={activeTab === "plan" ? "active-tab" : ""}
          onClick={() => setActiveTab("plan")}
        >
          Training Plan
        </button>

        <button
          className={activeTab === "evaluation" ? "active-tab" : ""}
          onClick={() => setActiveTab("evaluation")}
        >
          Evaluation
        </button>

      </div>

      {activeTab === "matrix" && (
        <>
          {/* Filters */}
          <div className="filters">

            <div className="department-selector">

  <label>
    Select Department
  </label>

  <select
    value={selectedDepartment}
    onChange={(e)=>setSelectedDepartment(e.target.value)}
  >

    <option value="">
      Choose Department
    </option>

    {departments.map((dept)=>(
      <option
        key={dept.id}
        value={dept.department_name}
      >
        {dept.department_name}
      </option>
    ))}

  </select>

</div>

            <select
  value={selectedEmployee}
  onChange={(e) => {
    setSelectedEmployee(e.target.value);

    const emp = employees.find(
      (employee) => employee.name === e.target.value
    );

    setEmployeeDetails(emp);

  }}
>
  <option value="">Select Employee</option>

  {employees
    .filter(
      (emp) =>
        !selectedDepartment ||
        emp.department === selectedDepartment
    )
    .map((emp) => (
      <option
        key={emp.id}
        value={emp.name}
      >
        {emp.name}
      </option>
    ))}
</select>

            <select
  value={selectedYear}
  onChange={(e) => setSelectedYear(e.target.value)}
>
  <option>2025</option>
  <option>2026</option>
  <option>2027</option>
  <option>2028</option>
</select>

          </div>

          {/* Employee Details */}
          <div className="employee-card">

            <h2>Employee Information</h2>

            <div className="employee-grid">

              <div>
                <strong>Employee</strong>
<p>{employeeDetails?.name || "-"}</p>              </div>

              <div>
                <strong>Designation</strong>
<p>{employeeDetails?.designation || "-"}</p>              </div>

              <div>
                <strong>Education</strong>
<p>{employeeDetails?.education || "-"}</p>              </div>

              <div>
                <strong>Company Experience</strong>
<p>{employeeDetails?.company_experience || "-"}</p>              </div>

              <div>
                <strong>Total Experience</strong>
<p>{employeeDetails?.total_experience || "-"}</p>              </div>

              <div>
                <strong>Matrix Status</strong>
<p>{employeeDetails?.matrix_status || "-"}</p>              </div>

            </div>

          </div>

          {/* Matrix */}
          <div className="table-container">

            <div className="page-header">

              <h2>Competency Matrix</h2>

              <button
  className="add-btn"
  onClick={() => {
    if (!selectedEmployee) {
      alert("Please select an employee first.");
      return;
    }

    setSelectedCompetency(null);
    setShowModal(true);
  }}
>
  + Add Training Topic
</button>

            </div>

            <table>

              <thead>

                <tr>

                  <th>Training Topic</th>
                  <th>Required</th>
                  <th>Self</th>
                  <th>HOD</th>
                  <th>Gap</th>
                  <th>Training?</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

  {competencies.length === 0 ? (

    <tr>

      <td
        colSpan="7"
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        No competency records found
      </td>

    </tr>

  ) : (

    competencies.map((item) => (

      <tr key={item.id}>

        <td>{item.training_topic}</td>

        <td>{item.required_level}</td>

        <td>{item.self_level}</td>

        <td>{item.hod_level}</td>

<td>
  <span
    className={
      item.gap >= 2
        ? "gap-badge high"
        : item.gap === 1
        ? "gap-badge medium"
        : "gap-badge low"
    }
  >
    {item.gap}
  </span>
</td>
        <td>
  <span
    className={
      item.training_required
        ? "training-badge yes"
        : "training-badge no"
    }
  >
    {item.training_required
      ? "Required"
      : "Not Required"}
  </span>
</td>

<td>
  <div className="action-buttons">

    <button
      className="edit-btn"
      onClick={() => {
        setSelectedCompetency(item);
        setShowModal(true);
      }}
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={async () => {

        const confirmDelete = window.confirm(
          `Delete "${item.training_topic}"?`
        );

        if (!confirmDelete) return;

        try {

          await api.delete(`/competency/${item.id}`);

          fetchCompetencies(
            selectedEmployee,
            selectedYear
          );

          alert("Deleted successfully!");

        } catch (error) {

          console.error(error);

          alert("Failed to delete record.");

        }

      }}
    >
      Delete
    </button>

  </div>
</td>
      </tr>

    ))

  )}

</tbody>

            </table>

          </div>
        </>
      )}

      {activeTab === "plan" && (
        <div className="coming-soon">
          <h2>Training Plan</h2>
          <p>Coming Next...</p>
        </div>
      )}

      {activeTab === "evaluation" && (
        <div className="coming-soon">
          <h2>Evaluation</h2>
          <p>Coming Next...</p>
        </div>
      )}

{showModal && (
  <CompetencyForm
    competency={selectedCompetency}
    employee={selectedEmployee}
    department={selectedDepartment}
    year={selectedYear}
    onClose={() => {
      setShowModal(false);
      setSelectedCompetency(null);

      fetchCompetencies(
        selectedEmployee,
        selectedYear
      );
    }}
  />
)}

    </div>
  );
}