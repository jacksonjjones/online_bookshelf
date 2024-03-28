const router = require("express").Router();
const { Book, User } = require("../models"); // Importing both Book and User models
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({});

    const books = bookData.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books, // Adjusted variable name to 'books'
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/book/:id", withAuth, async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {});

    const book = bookData.get({ plain: true });

    res.render("book", {
      ...book, // Adjusted variable name to 'book'
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.all("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

module.exports = router;
