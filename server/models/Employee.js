const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manager: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive", "On Leave"),
      defaultValue: "Active",
    },
    joining_date: {
      type: DataTypes.DATEONLY,
    },
    contact_number: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
    },
    education: {
      type: DataTypes.STRING,
    },
    company_experience: {
      type: DataTypes.STRING,
    },
    total_experience: {
      type: DataTypes.STRING,
    },
    matrix_status: {
      type: DataTypes.STRING,
      defaultValue: "Draft",
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

module.exports = Employee;