const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        // Fetch books from the Google Books API
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        
        // Check if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        // Parse the JSON response
        const data = await response.json();

        // Respond with the fetched books
        res.status(200).json(data);
    } catch (err) {
        // Handle errors
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/search/:term', async (req,res) => {
    try {
        // Fetch books from the Google Books API
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.params.term}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=10`);
        
        // Check if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        // Parse the JSON response
        const data = await response.json();
        const books = []
        for (let i = 0; i < 10; i++) {
            books.push(data.items[i])
        }
        // Respond with the fetched books
        res.status(200).json(books);
    } catch (err) {
        // Handle errors
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;

//probs move into book routes
