const express = require("express");
const router = express.Router();
const EmployeeTraining = require("../models/EmployeeTraining");

// Get employees assigned to a training
router.get("/:title", async (req, res) => {
  try {
    const data = await EmployeeTraining.findAll({
      where: {
        training_title: req.params.title,
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Assign employee
router.post("/", async (req, res) => {
  try {
    const record = await EmployeeTraining.create(req.body);

    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// Update progress/proficiency
router.put("/:id", async (req, res) => {
  try {
    const record = await EmployeeTraining.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    await record.update(req.body);

    res.json(record);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// Remove assignment
router.delete("/:id", async (req, res) => {
  try {
    const record = await EmployeeTraining.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    await record.destroy();

    res.json({
      message: "Assignment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;