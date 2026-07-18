const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");

const Employee = require("./models/Employee");
const employeeRoutes = require("./routes/employeeRoutes");

const Department = require("./models/Department");
const departmentRoutes = require("./routes/departmentRoutes");

const Training = require("./models/Training");
const trainingRoutes = require("./routes/trainingRoutes");

const EmployeeTraining = require("./models/EmployeeTraining");
const employeeTrainingRoutes = require("./routes/employeeTrainingRoutes");

const CompetencyMapping = require("./models/CompetencyMapping");
const competencyRoutes = require("./routes/competencyRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/employee-training", employeeTrainingRoutes);
app.use("/api/competency", competencyRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Training Management API is running!");
});

const PORT = 5000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Connected to MySQL");

    // Sync model with database
    await Employee.sync();
    await Department.sync();
    await Training.sync();
    await EmployeeTraining.sync();
    await CompetencyMapping.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:");
    console.error(err.message);
  });