const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CompetencyMapping = sequelize.define(
  "CompetencyMapping",
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

    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    training_topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    required_level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    self_level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    hod_level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    gap: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    training_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    action: {
      type: DataTypes.STRING,
      defaultValue: "No Action",
    },
  },
  {
    tableName: "competency_mapping",
    timestamps: false,
  }
);

module.exports = CompetencyMapping;