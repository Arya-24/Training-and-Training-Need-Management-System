import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Training from "./pages/Training";
import CompetencyMapping from "./pages/CompetencyMapping";
import Dashboard from "./pages/Dashboard";

import "./index.css";

function App() {
  const [activePage, setActivePage] = useState("employees");

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main">
        <Header />

        <div className="content">
          {activePage === "employees" && <Employees />}
          {activePage === "departments" && <Departments />}
          {activePage === "training" && <Training />}

          {/* We'll add these later */}
{activePage === "dashboard" && <Dashboard />}
{activePage === "mapping" && <CompetencyMapping />}        </div>
      </div>
    </div>
  );
}

export default App;