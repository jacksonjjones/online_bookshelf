let searchData; // Declare a variable outside of the event listener

searchBook.addEventListener("click", function () {
  fetch("/api/google/search/" + search.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      searchData = data; // Store the data in the variable
      for (let i = 0; i < data.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card", "book");

        // Card content
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        // Title
        const title = document.createElement("h3");
        title.innerText = data[i].volumeInfo.title;
        cardContent.appendChild(title);

        // Plus sign button
        const plusButton = document.createElement("button");
        plusButton.innerText = "Add To Shelf";
        plusButton.classList.add("add-to-collection-btn");
        cardContent.appendChild(plusButton);

        card.appendChild(cardContent);
        document.getElementById("searchedBooks").appendChild(card);

        // Author
        const author = document.createElement("p");
        author.innerHTML = `<strong>Author:</strong> ${
          data[i].volumeInfo.authors
            ? data[i].volumeInfo.authors.join(", ")
            : "Unknown"
        }`;
        cardContent.appendChild(author);

        // Genre
        const genre = document.createElement("p");
        genre.innerHTML = `<strong>Genre:</strong> ${
          data[i].volumeInfo.categories
            ? data[i].volumeInfo.categories.join(", ")
            : "Unknown"
        }`;
        cardContent.appendChild(genre);

        // Thumbnail
        if (
          data[i].volumeInfo.imageLinks &&
          data[i].volumeInfo.imageLinks.thumbnail
        ) {
          const thumbnail = document.createElement("img");
          thumbnail.src = data[i].volumeInfo.imageLinks.thumbnail;
          thumbnail.alt = data[i].volumeInfo.title;
          cardContent.appendChild(thumbnail);
        }

        card.appendChild(cardContent);
        document.getElementById("searchedBooks").appendChild(card);
      }
    });
});

// Event listener for click events within the #searchedBooks element
document.getElementById("searchedBooks").addEventListener("click", (event) => {
  // Check if the clicked element has the class "add-to-collection-btn"
  if (event.target.classList.contains("add-to-collection-btn")) {
    // Extract book details from the parent element of the clicked button
    const parentElement = event.target.closest(".book");
    const title = parentElement.querySelector("h3").innerText;
    const author = parentElement
      .querySelector("p:nth-of-type(1)")
      .innerText.split(":")[1]
      .trim();
    const genre = parentElement
      .querySelector("p:nth-of-type(2)")
      .innerText.split(":")[1]
      .trim();
    const thumbnail = parentElement.querySelector("img").src;
    const description = searchData.find(
      (book) => book.volumeInfo.title === title
    ).volumeInfo.description;

    const bookDetails = {
      title,
      author,
      genre,
      thumbnail,
      description, // Include the description
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
