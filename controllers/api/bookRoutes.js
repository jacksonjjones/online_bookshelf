const router = require("express").Router();
const { Book } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:book_id", withAuth, async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.book_id);
    if (!bookData) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.render("book", {
      book: bookData.get({ plain: true }),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE (add) books to shelf
router.post("/", withAuth, async (req, res) => {
  try {
    // Ensure the user is logged in
    if (!req.session.logged_in) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract book details from the request body
    const { title, genre, author, description, thumbnail } = req.body;

    // Create a new book record with the user_id set to the current user's ID
    const newBook = await Book.create({
      title,
      genre,
      author,
      description,
      thumbnail,
      user_id: req.session.user_id, // Set user_id to the current user's ID
    });

    // Send a success response
    res.status(200).json({ message: "Book added successfully", newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:book_id", withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        book_id: req.params.book_id,
      },
    });
    if (!bookData) {
      res.status(404).json({ message: "No books with this ID found!" });
      return;
    }
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:book_id", (req, res) => {
  Book.update(
    {
      title: req.body.title,
      genre: req.body.genre,
      author: req.body.author,
    },
    {
      where: {
        book_id: req.params.book_id,
      },
    }
  )
    .then((updatedBook) => {
      res.json(updatedBook);
    })
    .catch((err) => res.json(err));
});
module.exports = router;
