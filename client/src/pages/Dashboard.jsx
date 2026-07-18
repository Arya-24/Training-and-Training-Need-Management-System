import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Bar,
  Pie
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import {
  FaUsers,
  FaBuilding,
  FaBook,
  FaCheckCircle
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {

const [employees, setEmployees] = useState([]);
const [departments, setDepartments] = useState([]);
const [trainings, setTrainings] = useState([]);

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const employeeRes = await api.get("/employees");
    const departmentRes = await api.get("/departments");
    const trainingRes = await api.get("/trainings");

    setEmployees(employeeRes.data);
    setDepartments(departmentRes.data);
    setTrainings(trainingRes.data);
  } catch (error) {
    console.error(error);
  }
};

const employeeDepartmentData = {
  labels: [...new Set(employees.map(emp => emp.department))],

  datasets: [
    {
      label: "Employees",

      data: [...new Set(employees.map(emp => emp.department))].map(
        dept =>
          employees.filter(emp => emp.department === dept).length
      ),

      backgroundColor: [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
        "#9333ea",
        "#0ea5e9"
      ],
    },
  ],
};

const trainingCategoryData = {
  labels: [...new Set(trainings.map(course => course.category))],

  datasets: [
    {
      data: [...new Set(trainings.map(course => course.category))].map(
        category =>
          trainings.filter(
            course => course.category === category
          ).length
      ),

      backgroundColor: [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
      ],
    },
  ],
};

  return (
    <div className="dashboard-page">

      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <FaUsers className="dashboard-icon" />
          <h3>Total Employees</h3>
<h2>{employees.length}</h2>        </div>

        <div className="dashboard-card">
          <FaBuilding className="dashboard-icon" />
          <h3>Departments</h3>
<h2>{departments.length}</h2>        </div>

        <div className="dashboard-card">
          <FaBook className="dashboard-icon" />
          <h3>Trainings</h3>
<h2>{trainings.length}</h2>        </div>

        <div className="dashboard-card">
          <FaCheckCircle className="dashboard-icon" />
          <h3>Active Trainings</h3>
<h2>
  {
    trainings.filter(
      (training) => training.status === "Active"
    ).length
  }
</h2>        </div>

      </div>

      {/* Charts */}

      <div className="dashboard-grid">

        <div className="dashboard-box">

  <h3>Employee Distribution</h3>

  <div className="dashboard-chart">

    <Bar
      data={employeeDepartmentData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />

  </div>

</div>

        <div className="dashboard-box">

  <h3>Training Status</h3>

  <div className="dashboard-chart">

    <Pie
      data={trainingCategoryData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />

  </div>

</div>

      </div>

      {/* Bottom Section */}

      <div className="dashboard-grid">

        <div className="dashboard-box">

          <h3>Recent Employees</h3>

<table className="recent-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Department</th>
      <th>Designation</th>
    </tr>
  </thead>

  <tbody>
    {employees.slice(0, 5).map((emp) => (
      <tr key={emp.id}>
        <td>{emp.name}</td>
        <td>{emp.department}</td>
        <td>{emp.designation}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>

        <div className="dashboard-box">

          <h3>Recent Trainings</h3>

<table className="recent-table">
  <thead>
    <tr>
      <th>Course</th>
      <th>Category</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {trainings.slice(0, 5).map((course) => (
      <tr key={course.id}>
        <td>{course.title}</td>
        <td>{course.category}</td>
        <td>
          <span
            className={
              course.status === "Active"
                ? "status active"
                : "status inactive"
            }
          >
            {course.status}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>

      </div>

    </div>
  );
}