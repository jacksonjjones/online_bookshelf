// Define the deleteBookHandler function
const deleteBookHandler = async (event) => {
  // Prevent default form submission behavior
  event.preventDefault();

  // Extract book ID from the data attribute of the clicked button
  const bookId = event.target.dataset.bookId;

  // Log the book ID to verify the event is triggered
  console.log("Delete button clicked for book ID:", bookId);

  try {
    // Send DELETE request to the server to delete the book
    const response = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Redirect to the homepage after successful deletion
      window.location.href = "/";

      // Optionally, remove the book container from the page immediately
      event.target.closest(".book-container").remove();
    } else {
      // Alert the user if there was an error
      alert("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    // Display an error message or handle the error in another way
  }
};

// Select all delete buttons for books on the page
const deleteButtons = document.querySelectorAll(".delete-btn");

// Loop through all delete buttons and attach event listener to each one
deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteBookHandler);
});
