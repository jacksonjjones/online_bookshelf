const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch book list from the API 
    const response = await fetch (
        `https://api.nytimes.com/svc/books/v3/lists/best-sellers/title.json?api-key=${process.env.NYTIMES_API_KEY}`
    );

    //Check if the response is successful
    if(!response.ok) {
        throw new Error('Could not fetch list');
    }

    const data = await response.json()

    res.status(200).json(data);
} catch (err) {
  // Handle errors
  console.error("Error fetching list:", err);
  res.status(500).json({ error: "Internal Server Error" });
};
})