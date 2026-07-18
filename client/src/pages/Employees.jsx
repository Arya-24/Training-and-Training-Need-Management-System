import { useEffect, useState } from "react";
import api from "../services/api";
import EmployeeForm from "../components/EmployeeForm";

export default function Employees() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("");
const [designationFilter, setDesignationFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Load employees when page opens
  useEffect(() => {
    fetchEmployees();
  }, []);

const filteredEmployees = employees.filter((employee) => {
  const matchesSearch =
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesDepartment =
    departmentFilter === "" ||
    employee.department === departmentFilter;

  const matchesDesignation =
    designationFilter === "" ||
    employee.designation === designationFilter;

  const matchesStatus =
    statusFilter === "" ||
    employee.status === statusFilter;

  return (
    matchesSearch &&
    matchesDepartment &&
    matchesDesignation &&
    matchesStatus
  );
});

const exportToCSV = () => {
  if (filteredEmployees.length === 0) {
    alert("No employees to export.");
    return;
  }

  const headers = [
    "Employee ID",
    "Name",
    "Department",
    "Designation",
    "Manager",
    "Status",
    "Joining Date",
    "Rating",
  ];

  const rows = filteredEmployees.map((employee) => [
    employee.employee_id,
    employee.name,
    employee.department,
    employee.designation,
    employee.manager,
    employee.status,
    employee.joining_date,
    employee.rating,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "employees.csv";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

  return (
    <div className="employees-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Employees</h1>

        <div className="header-buttons">
<button
  className="export-btn"
  onClick={exportToCSV}
>
  Export
</button>
          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Employee
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
  type="text"
  placeholder="Search by name or ID..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

        <select
  value={departmentFilter}
  onChange={(e) => setDepartmentFilter(e.target.value)}
>
  <option value="">All Departments</option>
  <option>Polymer R&D</option>
  <option>Production</option>
  <option>Quality Control</option>
  <option>Supply Chain</option>
  <option>Maintenance</option>
  <option>HR & Admin</option>
</select>

        <select
  value={designationFilter}
  onChange={(e) => setDesignationFilter(e.target.value)}
>
  <option value="">All Designations</option>
  <option>Senior Polymer Scientist</option>
  <option>Line Supervisor</option>
  <option>QC Analyst</option>
  <option>Procurement Lead</option>
  <option>Reliability Engineer</option>
  <option>Process Chemist</option>
  <option>HR Business Partner</option>
  <option>Extrusion Operator</option>
</select>

        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="">All Status</option>
  <option>Active</option>
  <option>On Leave</option>
  <option>Inactive</option>
</select>
      </div>

      {/* Employee Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Manager</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
{filteredEmployees.length === 0 ? (              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No employees found
                </td>
              </tr>
            ) : (
filteredEmployees.map((employee) => (                <tr key={employee.id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.manager}</td>
                  <td>
  <span
    className={
      employee.status === "Active"
        ? "status active"
        : employee.status === "On Leave"
        ? "status leave"
        : "status inactive"
    }
  >
    {employee.status}
  </span>
</td>
                  <td>{employee.joining_date}</td>
                  <td>{employee.rating}</td>

                  <td className="action-buttons">
    <button
  className="edit-btn"
  onClick={() => {
    setSelectedEmployee(employee);
    setShowModal(true);
  }}
>
  Edit
</button>

    <button
  className="delete-btn"
  onClick={async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/employees/${employee.id}`);

      alert("Employee deleted successfully!");

      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee.");
    }
  }}
>
  Delete
</button>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <EmployeeForm
  employee={selectedEmployee}
  onClose={() => {
    setShowModal(false);
    setSelectedEmployee(null);
    fetchEmployees();
  }}
/>
      )}
    </div>
  );
}