const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Training = sequelize.define(
  "Training",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    training_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
    },

    duration: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM(
        "Active",
        "Inactive"
      ),
      defaultValue: "Active",
    },

    description: {
      type: DataTypes.TEXT,
    },

    completion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    assigned_employees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "trainings",
    timestamps: false,
  }
);

module.exports = Training;