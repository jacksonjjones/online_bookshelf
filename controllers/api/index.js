const router = require("express").Router();
const bookRoutes = require("./bookRoutes");
const googleBooks = require("./googleBooks");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes")

router.use("/books", bookRoutes);
router.use("/google", googleBooks);
router.use("/users", userRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
