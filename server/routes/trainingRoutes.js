const express = require("express");
const router = express.Router();

const Training = require("../models/Training");


// GET all trainings
router.get("/", async (req, res) => {
  try {
    const trainings = await Training.findAll();

    res.json(trainings);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// GET training by ID
router.get("/:id", async (req, res) => {

  try {

    const training = await Training.findByPk(req.params.id);

    if (!training) {
      return res.status(404).json({
        message: "Training not found"
      });
    }

    res.json(training);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ADD training/course
router.post("/", async (req, res) => {

  try {

    const training = await Training.create(req.body);

    res.status(201).json(training);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});


// UPDATE training
router.put("/:id", async (req, res) => {

  try {

    const training = await Training.findByPk(req.params.id);


    if (!training) {

      return res.status(404).json({
        message: "Training not found"
      });

    }


    await training.update(req.body);


    res.json(training);


  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});


// DELETE training
router.delete("/:id", async (req, res) => {

  try {

    const training = await Training.findByPk(req.params.id);


    if (!training) {

      return res.status(404).json({
        message: "Training not found"
      });

    }


    await training.destroy();


    res.json({
      message: "Training deleted successfully"
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;