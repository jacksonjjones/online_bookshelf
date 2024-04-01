const router = require("express").Router();
const bookRoutes = require("./bookRoutes");
const googleBooks = require("./googleBooks");
const userRoutes = require("./userRoutes");

router.use("/books", bookRoutes);
router.use("/google", googleBooks);
router.use("/users", userRoutes);

module.exports = router;
