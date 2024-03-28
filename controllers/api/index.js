const router = require("express").Router();
const bookRoutes = require("./bookRoutes");
const googleBooks = require("./googleBooks");

router.use("/books", bookRoutes);
router.use("/google", googleBooks);

module.exports = router;
