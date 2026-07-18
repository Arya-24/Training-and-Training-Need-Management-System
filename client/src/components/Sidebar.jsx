import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaBook,
  FaClipboardList
} from "react-icons/fa";

export default function Sidebar({
  activePage,
  setActivePage,
}) {
  return (
    <div className="sidebar">

      <div className="logo">
        TrainingMS
      </div>

      <ul>

        <li
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          <FaHome />
          <span>Dashboard</span>
        </li>

        <li
          className={activePage === "employees" ? "active" : ""}
          onClick={() => setActivePage("employees")}
        >
          <FaUsers />
          <span>Employees</span>
        </li>

        <li
          className={activePage === "departments" ? "active" : ""}
          onClick={() => setActivePage("departments")}
        >
          <FaBuilding />
          <span>Departments</span>
        </li>

        <li
          className={activePage === "training" ? "active" : ""}
          onClick={() => setActivePage("training")}
        >
          <FaBook />
          <span>Training</span>
        </li>

        <li
          className={activePage === "mapping" ? "active" : ""}
          onClick={() => setActivePage("mapping")}
        >
          <FaClipboardList />
          <span>Competency Mapping</span>
        </li>

      </ul>

    </div>
  );
}