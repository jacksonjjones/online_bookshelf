const search = document.getElementById("search");
const searchBook = document.getElementById("searchBook");

searchBook.addEventListener("click", function () {
  fetch("/api/google/search/" + search.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const container = document.createElement("div");

        // Title
        const title = document.createElement("h2");
        title.innerText = data[i].volumeInfo.title;
        container.appendChild(title);

        // Author
        const author = document.createElement("p");
        author.innerText =
          "Author: " +
          (data[i].volumeInfo.authors
            ? data[i].volumeInfo.authors.join(", ")
            : "Unknown");
        container.appendChild(author);

        // Thumbnail
        if (
          data[i].volumeInfo.imageLinks &&
          data[i].volumeInfo.imageLinks.thumbnail
        ) {
          const thumbnail = document.createElement("img");
          thumbnail.src = data[i].volumeInfo.imageLinks.thumbnail;
          thumbnail.alt = data[i].volumeInfo.title;
          container.appendChild(thumbnail);
        }

        // Genre
        const genre = document.createElement("p");
        genre.innerText =
          "Genre: " +
          (data[i].volumeInfo.categories
            ? data[i].volumeInfo.categories.join(", ")
            : "Unknown");
        container.appendChild(genre);

        // Plus sign button
        const plusButton = document.createElement("button");
        plusButton.innerText = "+";
        plusButton.classList.add("add-to-collection-btn");
        container.appendChild(plusButton);

        document.getElementById("searchedBooks").appendChild(container);
      }
    });
});

// Event listener for click events within the #searchedBooks element
document.getElementById("searchedBooks").addEventListener("click", (event) => {
  // Check if the clicked element has the class "add-to-collection-btn"
  if (event.target.classList.contains("add-to-collection-btn")) {
    // Extract book details from the parent element of the clicked button
    const parentElement = event.target.parentElement;
    const bookDetails = {
      // Extract title from the parent element of the clicked button
      title: parentElement.querySelector("h2").innerText,
      // Extract author from the parent element of the clicked button
      author: parentElement.querySelector("p").innerText.substring(8), // Remove "Author: " prefix
      // Extract genre from the parent element of the clicked button
      genre: parentElement.querySelector("p").innerText.substring(8), // Remove "Genre: " prefix
      // Extract thumbnail source from the parent element of the clicked button
      thumbnail: parentElement.querySelector("img").src,
    };

    // Call the addToCollection function and pass the bookDetails object as an argument
    addToCollection(bookDetails);
  }
});

// Function to handle adding a book to the collection
function addToCollection(bookDetails) {
  fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookDetails),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add book to collection");
      }
      // Book added successfully
      console.log("Book added to collection");
    })
    .catch((error) => {
      console.error("Error adding book to collection:", error);
    });
}
