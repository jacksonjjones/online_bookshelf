const express = require("express");
const router = express.Router();
const { User, Book } = require("../models");

// Route to render the user profile page
router.get("/profile", async (req, res) => {
  try {
    // Retrieve the logged-in user's information
    const user = await User.findByPk(req.session.user_id, {
      include: [{ model: Book }], // Include associated books
    });

    // Render the profile page and pass the user object to the template
    res.render("profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
