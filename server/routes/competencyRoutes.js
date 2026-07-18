const express = require("express");
const router = express.Router();
const CompetencyMapping = require("../models/CompetencyMapping");

// =========================
// GET all competency records
// =========================
router.get("/", async (req, res) => {
  try {
    const records = await CompetencyMapping.findAll({
      order: [["id", "ASC"]],
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// GET by employee + year
// =========================
router.get("/:employee/:year", async (req, res) => {
  try {
    const records = await CompetencyMapping.findAll({
      where: {
        employee_name: req.params.employee,
        year: req.params.year,
      },
      order: [["id", "ASC"]],
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// ADD competency row
// =========================
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const gap = Math.max(
      data.required_level - data.hod_level,
      0
    );

    let action = "No Gap";

    if (gap === 1) action = "Monitor";
    if (gap >= 2) action = "Training Required";

    const competency =
      await CompetencyMapping.create({
        ...data,
        gap,
        training_required: gap >= 2,
        action,
      });

    res.status(201).json(competency);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// =========================
// UPDATE competency row
// =========================
router.put("/:id", async (req, res) => {
  try {
    const competency =
      await CompetencyMapping.findByPk(
        req.params.id
      );

    if (!competency) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    const data = req.body;

    const gap = Math.max(
      data.required_level - data.hod_level,
      0
    );

    let action = "No Gap";

    if (gap === 1) action = "Monitor";
    if (gap >= 2) action = "Training Required";

    await competency.update({
      ...data,
      gap,
      training_required: gap >= 2,
      action,
    });

    res.json(competency);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// =========================
// DELETE competency row
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const competency =
      await CompetencyMapping.findByPk(
        req.params.id
      );

    if (!competency) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    await competency.destroy();

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;