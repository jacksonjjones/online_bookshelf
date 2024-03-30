const router = require("express").Router();
const { Book, User } = require("../models"); // Importing both Book and User models
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Fetch all books from the database
    const bookData = await Book.findAll({
      attributes: [
        "book_id",
        "title",
        "genre",
        "author",
        "description",
        "thumbnail",
      ],
    });

    // Map the book data to plain objects
    const books = bookData.map((book) => book.get({ plain: true }));

    // Rendering the homepage template with fetched data using main layout
    res.render("homepage", {
      layout: "main",
      books,
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

router.get('/explore', (req, res) => {
  res.render('explore')
})

module.exports = router;
