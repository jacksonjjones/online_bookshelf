// Define the updateReadCount function
async function updateReadCountAPI(bookId, newReadCount) {
  try {
    // Send PUT request to the server to update the read count for the book
    const response = await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ readCount: newReadCount }),
    });

    if (!response.ok) {
      throw new Error("Failed to update read count");
    }

    // Read count updated successfully
    console.log("Read count updated successfully");

    // Persist the updated read count in local storage
    localStorage.setItem(`book_${bookId}_read_count`, newReadCount);

    // Optionally, refresh the user's collection to reflect the updated read count
  } catch (error) {
    console.error("Error updating read count:", error);
    // Optionally, show an error message to the user
  }
}

// Define the updateReadCountHandler function
const updateReadCountHandler = (event) => {
  // Prevent default form submission behavior
  event.preventDefault();

  // Check if the clicked element has the class "update-read-count-btn"
  if (event.target.classList.contains("update-read-count-btn")) {
    // Extract book ID from the data attribute of the clicked button
    const bookId = event.target.dataset.bookId;

    // Extract new read count from the input field within the parent element
    const parentElement = event.target.parentElement; // Get the parent element
    const newReadCount = parseInt(
      parentElement.querySelector(".read-count-input").value
    );

    // Check if the new read count is a valid number
    if (!isNaN(newReadCount)) {
      // Call the updateReadCount function with the book ID and new read count
      updateReadCountAPI(bookId, newReadCount);
    } else {
      // Handle invalid input (e.g., display an error message)
    }
  }
};

// Add event listener only to the update buttons
document.querySelectorAll(".update-read-count-btn").forEach((button) => {
  button.addEventListener("click", updateReadCountHandler);
});

// Retrieve and display the read count when the page loads
window.addEventListener("load", () => {
  document.querySelectorAll(".update-read-count-btn").forEach((button) => {
    const bookId = button.dataset.bookId;
    const storedReadCount = localStorage.getItem(`book_${bookId}_read_count`);
    if (storedReadCount !== null) {
      // Update the read count input field with the stored value
      button.parentElement.querySelector(".read-count-input").value =
        storedReadCount;
    }
  });
});
