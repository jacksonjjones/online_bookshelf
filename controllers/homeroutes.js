const router = require("express").Router();
const { Book, User } = require("../models"); // Importing both Book and User models
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    // Fetch all books added by the currently authenticated user
    const bookData = await Book.findAll({
      where: {
        user_id: req.session.user_id, // Filter books by user_id
      },
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
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/explore", withAuth, async (req, res) => {
  try {
    console.log("Accessing /explore route...");
    // Check if the user is logged in
    if (!req.session.logged_in) {
      // If not logged in, redirect to the login page
      return res.redirect("/login");
    }

    // Your logic to fetch explore page data goes here
    res.render("explore", {
      // Your data to pass to the explore page template
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
