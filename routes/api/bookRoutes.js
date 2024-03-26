const router = require('express').Router();
const { Book } = require('../../models/Book');

// //CREATE (add) books to shelf
// router.post('/', async (req, res) => { 
//     try {
//         const bookData = await Book.create(req.body);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// })