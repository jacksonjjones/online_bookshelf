const router = require('express').Router();
const { Book } = require('../../models/Book');

//CREATE (add) books to shelf
router.post('/', async (req, res) => { 
    try {
        const bookData = await Book.create(req.body);
        res.status(200).json(bookData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//DELETE books from shelf
router.delete('/:id', async (req, res) => {
    try {
        const bookData = await Book.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!bookData) {
            res.status(404).json({ message: "No books with this ID found!"});
            return;
        }
        res.status(200).json(bookData);
    } catch(err) {
        res.status(500).json(err);
    }
});

//UPDATE

module.exports = router;
