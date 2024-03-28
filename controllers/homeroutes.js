const router = require("express").Router();
const { Book } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({});

    const book = bookData.map((blogPost) => book.get({ plain: true }));

    res.render("homepage", {
      book,
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

    res.render("books", {
      ...books,
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
