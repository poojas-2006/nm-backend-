const express = require("express");

const Goal = require("../models/Goal");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE GOAL
router.post("/", authMiddleware, async (req, res) => {

  const goal = await Goal.create({
    title: req.body.title,
    user: req.user
  });

  res.json(goal);

});


// GET GOALS
router.get("/", authMiddleware, async (req, res) => {

  const goals = await Goal.find({ user: req.user });

  res.json(goals);

});


// UPDATE GOAL
router.put("/:id", authMiddleware, async (req, res) => {

  const goal = await Goal.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );

  res.json(goal);

});


// DELETE GOAL
router.delete("/:id", authMiddleware, async (req, res) => {

  await Goal.findByIdAndDelete(req.params.id);

  res.json({ message: "Goal deleted" });

});

module.exports = router;