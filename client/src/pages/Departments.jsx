import { useEffect, useState } from "react";
import api from "../services/api";
import DepartmentForm from "../components/DepartmentForm";

import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const [activeTab, setActiveTab] = useState("list");
const [selectedDashboardDepartment, setSelectedDashboardDepartment] =useState("");
const [employees, setEmployees] = useState([]);
const [trainings, setTrainings] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
     fetchEmployees();
       fetchTrainings();

  }, []);

  const filteredDepartments = departments.filter((department) =>
  department.department_name
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  department.department_id
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

const exportToCSV = () => {
  if (filteredDepartments.length === 0) {
    alert("No departments to export.");
    return;
  }

  const headers = [
    "Department ID",
    "Department Name",
    "HOD",
    "Employees",
    "Budget",
    "Description",
  ];

  const rows = filteredDepartments.map((department) => [
    department.department_id,
    department.department_name,
    department.hod,
    department.employees,
    department.budget,
    department.description,
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
  link.download = "departments.csv";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const dashboardDepartment = departments.find(
  (dept) =>
    dept.department_name === selectedDashboardDepartment
);

const departmentEmployees = employees.filter(
  (emp) =>
    emp.department === selectedDashboardDepartment
);

const fetchEmployees = async () => {

  try {

    const response = await api.get("/employees");

    setEmployees(response.data);

  } catch(error){

    console.error(error);

  }

};

const designationData = {

  labels:[
    ...new Set(
      departmentEmployees.map(
        emp => emp.designation
      )
    )
  ],

  datasets:[
    {
      label:"Employees",

      data:[
        ...new Set(
          departmentEmployees.map(
            emp => emp.designation
          )
        )
      ].map(
        designation =>
          departmentEmployees.filter(
            emp =>
              emp.designation === designation
          ).length
      )

    }

  ]

};

const ratingData = {

labels:[
  "1-2",
  "2-3",
  "3-4",
  "4-5"
],

datasets:[

{

label:"Ratings",

data:[

departmentEmployees.filter(
 emp => emp.rating >=1 && emp.rating <2
).length,


departmentEmployees.filter(
 emp => emp.rating >=2 && emp.rating <3
).length,


departmentEmployees.filter(
 emp => emp.rating >=3 && emp.rating <4
).length,


departmentEmployees.filter(
 emp => emp.rating >=4 && emp.rating <=5
).length

]

}

]

};

const fetchTrainings = async () => {

  try {

    const response = await api.get("/trainings");

    setTrainings(response.data);

  } catch(error){

    console.error(error);

  }

};

const averageRating =
departmentEmployees.length > 0
?
(
departmentEmployees.reduce(
(sum,emp)=>sum+Number(emp.rating || 0),0
)
/
departmentEmployees.length
).toFixed(1)
:
0;


const activeEmployees =
departmentEmployees.filter(
(emp)=>emp.status==="Active"
).length;


const trainingCompletion =
trainings.length > 0
?
(
trainings.reduce(
(sum,t)=>sum+Number(t.completion || 0),0
)
/
trainings.length
).toFixed(0)
:
0;

  return (
    <div className="employees-page">

      <div className="page-header">
        <h1>Departments</h1>

        <div className="header-buttons">
          <button
  className="export-btn"
  onClick={exportToCSV}
>
  Export
</button>

          <button
  className="add-btn"
  onClick={() => {
    setSelectedDepartment(null);
    setShowModal(true);
  }}
>
  + Add Department
</button>
        </div>
      </div>

      <div className="tabs">

  <button
    className={activeTab === "list" ? "active-tab" : ""}
    onClick={() => setActiveTab("list")}
  >
    Department List
  </button>

  <button
    className={activeTab === "dashboard" ? "active-tab" : ""}
    onClick={() => setActiveTab("dashboard")}
  >
    Department Dashboard
  </button>

</div>

{activeTab === "list" && (
<>

      <div className="filters">
        <input
  type="text"
  placeholder="Search by Department Name or ID..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
      </div>

      <div className="table-container">
        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>HOD</th>
              <th>Employees</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredDepartments.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No Departments Found
                </td>

              </tr>

            ) : (

filteredDepartments.map((department) => (
                <tr key={department.id}>

                  <td>{department.department_id}</td>

                  <td>{department.department_name}</td>

                  <td>{department.hod}</td>

                  <td>{department.employees}</td>

                  <td>₹ {department.budget}</td>

                  <td className="action-buttons">

                    <button
  className="edit-btn"
  onClick={() => {
    setSelectedDepartment(department);
    setShowModal(true);
  }}
>
  Edit
</button>

                    <button
  className="delete-btn"
  onClick={async () => {
    const confirmDelete = window.confirm(
      `Delete ${department.department_name}?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/departments/${department.id}`);

      alert("Department deleted successfully!");

      fetchDepartments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete department.");
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
</>
)}

{activeTab === "dashboard" && (

  <div className="department-dashboard">

    <h2>Department Dashboard</h2>

{activeTab === "dashboard" && (

<div className="department-dashboard">

  <div className="filters">

<select
  value={selectedDashboardDepartment}
  onChange={(e) =>
    setSelectedDashboardDepartment(e.target.value)
  }
>      <option>Select Department</option>

      {departments.map((dept) => (

        <option
          key={dept.id}
          value={dept.department_name}
        >
          {dept.department_name}
        </option>

      ))}

    </select>

  </div>

  <div className="dashboard-cards">

    <div className="dashboard-card">
      <h3>Total Departments</h3>
      <h2>{departments.length}</h2>
    </div>

    <div className="dashboard-card">
      <h3>Total Employees</h3>
      <h2>{departments.reduce((sum, dept) => sum + Number(dept.employees || 0), 0)}</h2>
    </div>

    <div className="dashboard-card">
      <h3>Total Budget</h3>
      <h2>
        ₹
        {departments
          .reduce((sum, dept) => sum + Number(dept.budget || 0), 0)
          .toLocaleString()}
      </h2>
    </div>

    <div className="dashboard-card">
      <h3>Departments</h3>
      <h2>{departments.length}</h2>
    </div>

  </div>

  <div className="dashboard-grid">

    <div className="dashboard-box">

  <h3>Department Overview</h3>

  {dashboardDepartment ? (

    <div className="employee-grid">

      <div>
        <strong>Department</strong>
        <p>{dashboardDepartment.department_name}</p>
      </div>

      <div>
        <strong>Department ID</strong>
        <p>{dashboardDepartment.department_id}</p>
      </div>

      <div>
        <strong>HOD</strong>
        <p>{dashboardDepartment.hod}</p>
      </div>

      <div>
        <strong>Employees</strong>
        <p>{dashboardDepartment.employees}</p>
      </div>

      <div>
        <strong>Budget</strong>
        <p>₹ {dashboardDepartment.budget}</p>
      </div>

      <div>
        <strong>Description</strong>
        <p>{dashboardDepartment.description}</p>
      </div>

    </div>

  ) : (

    <p>Select a department to view analytics.</p>

  )}

</div>

    <div className="dashboard-box">

      <h3>Employee Distribution</h3>

<div className="dashboard-chart">

<Bar
 data={designationData}
 options={{
   responsive:true,
   maintainAspectRatio:false,
   plugins:{
     legend:{
       position:"bottom"
     }
   }
 }}
/>

</div>

<div className="dashboard-chart">

<Pie
 data={ratingData}
 options={{
   responsive:true,
   maintainAspectRatio:false,
   plugins:{
     legend:{
       position:"bottom"
     }
   }
 }}
/>

</div>

    </div>

    </div>


  {/* Department KPI Section */}

  <div className="dashboard-box">

    <h3>
      Department KPIs
    </h3>


    <table className="recent-table">

      <thead>

        <tr>
          <th>KPI</th>
          <th>Value</th>
          <th>Status</th>
        </tr>

      </thead>


      <tbody>


        <tr>

          <td>
            Total Employees
          </td>

          <td>
            {departmentEmployees.length}
          </td>

          <td>
            Active
          </td>

        </tr>



        <tr>

          <td>
            Active Employees
          </td>

          <td>
            {activeEmployees}
          </td>

          <td>
            Good
          </td>

        </tr>



        <tr>

          <td>
            Average Rating
          </td>

          <td>
            ⭐ {averageRating}
          </td>

          <td>
            Excellent
          </td>

        </tr>



        <tr>

          <td>
            Training Completion
          </td>

          <td>
            {trainingCompletion}%
          </td>

          <td>
            Completed
          </td>

        </tr>


      </tbody>


    </table>


  </div>

{/* Employee Performance Section */}

<div className="dashboard-box">

  <h3>
    Employee Performance
  </h3>


  <table className="recent-table">

    <thead>

      <tr>
        <th>
          Employee
        </th>

        <th>
          Designation
        </th>

        <th>
          Experience
        </th>

        <th>
          Rating
        </th>

        <th>
          Status
        </th>

      </tr>

    </thead>


    <tbody>

      {departmentEmployees.length === 0 ? (

        <tr>

          <td
            colSpan="5"
            style={{
              textAlign:"center",
              padding:"20px"
            }}
          >
            No employees found

          </td>

        </tr>

      ) : (

        departmentEmployees.map((emp)=>(
          
          <tr key={emp.id}>

            <td>
              {emp.name}
            </td>


            <td>
              {emp.designation}
            </td>


            <td>
              {emp.total_experience || "-"}
            </td>


            <td>
              ⭐ {emp.rating || 0}
            </td>


            <td>

              <span
                className={
                  emp.status === "Active"
                  ?
                  "status active"
                  :
                  "status inactive"
                }
              >

                {emp.status}

              </span>

            </td>


          </tr>

        ))

      )}

    </tbody>


  </table>


</div>

</div>

)}
  </div>

)}

{showModal && (
  <DepartmentForm
    department={selectedDepartment}
    onClose={() => {
      setShowModal(false);
      setSelectedDepartment(null);
      fetchDepartments();
    }}
  />
)}

    </div>
  );
}