const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EmployeeTraining = sequelize.define(
  "EmployeeTraining",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    training_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    proficiency: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "employee_training",
    timestamps: false,
  }
);

module.exports = EmployeeTraining;