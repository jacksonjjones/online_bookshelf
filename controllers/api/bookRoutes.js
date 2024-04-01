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
    const bookData = await Book.create(req.body);
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
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
