const express = require("express");
const router = express.Router();
const Talent = require("../models/Talent");

// Creates a new talent
router.post("/", async (req, res, next) => {
  try {
    const { name, email, skills, experience } = req.body;

    // Validation
    if (!name || !email || !skills || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if email already exists
    const existingTalent = await Talent.findOne({ email: email.toLowerCase() });
    if (existingTalent) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const talent = await Talent.create({
      name,
      email,
      skills: Array.isArray(skills) ? skills : [skills],
      experience,
    });

    res.status(201).json({
      success: true,
      data: talent,
      message: "Talent added successfully",
    });
  } catch (error) {
    next(error);
  }
});

// Get all the talents with filtration
router.get("/", async (req, res, next) => {
  try {
    const { skill } = req.query;

    let query = {};

    // Filter by skill if provided
    if (skill) {
      query.skills = { $regex: skill, $options: "i" }; // Case-insensitive search
    }

    const talents = await Talent.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: talents.length,
      data: talents,
    });
  } catch (error) {
    next(error);
  }
});

// Get single talent
router.get("/:id", async (req, res, next) => {
  try {
    const talent = await Talent.findById(req.params.id);

    if (!talent) {
      return res.status(404).json({
        success: false,
        message: "Talent not found",
      });
    }

    res.status(200).json({
      success: true,
      data: talent,
    });
  } catch (error) {
    next(error);
  }
});

// This one deletes the talent
router.delete("/:id", async (req, res, next) => {
  try {
    const talent = await Talent.findByIdAndDelete(req.params.id);

    if (!talent) {
      return res.status(404).json({
        success: false,
        message: "Talent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Talent deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, skills, experience } = req.body;

    // Validation
    if (!name || !email || !skills || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if talent exists
    let talent = await Talent.findById(req.params.id);
    if (!talent) {
      return res.status(404).json({
        success: false,
        message: "Talent not found",
      });
    }

    // Check if email is being changed and if new email already exists
    if (email.toLowerCase() !== talent.email.toLowerCase()) {
      const existingTalent = await Talent.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.params.id },
      });
      if (existingTalent) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }
    }

    // Update talent
    talent = await Talent.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        skills: Array.isArray(skills) ? skills : [skills],
        experience,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: talent,
      message: "Talent updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
