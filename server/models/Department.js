const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    department_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    department_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hod: {
      type: DataTypes.STRING,
    },

    employees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    budget: {
      type: DataTypes.DECIMAL(12, 2),
    },

    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

module.exports = Department;