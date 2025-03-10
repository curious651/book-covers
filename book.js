// Function to get query parameters (like book ID)
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to sort covers by a given field
function sortBooks(field, book) {
  // Combine main book metadata with relatedCovers metadata
  const covers = [
    {
      image: book.coverImage,
      year: book.year,
      country: book.country,
      designer: book.designer,
      isMain: true, // Flag to identify the main cover
    },
    ...(book.relatedCovers || []).map((cover) => ({
      ...cover,
      isMain: false, // Flag to identify related covers
    })),
  ];

  // Sort the combined array by the specified field
  return covers.sort((a, b) => {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  });
}

// Function to render sorted covers
function renderSortedCovers(sortedCovers) {
  const gallery = document.getElementById("bookCoversGallery");
  gallery.innerHTML = ""; // Clear the gallery

  sortedCovers.forEach((cover) => {
    const coverDiv = document.createElement("div");
    coverDiv.classList.add("cover-item");
    coverDiv.innerHTML = `
      <img src="${cover.image}" alt="Cover from ${cover.country} by ${
      cover.designer
    }">
      <p><strong>Year:</strong> ${cover.year}</p>
      <p><strong>Country:</strong> ${cover.country}</p>
      <p><strong>Designer:</strong> ${cover.designer}</p>
      ${
        cover.isMain ? "<p><em>Main Cover</em></p>" : ""
      } <!-- Optional: Indicate the main cover -->
    `;
    gallery.appendChild(coverDiv);
  });
}

// Fetch the books data and display the selected book
fetch("books.json")
  .then((response) => response.json())
  .then((books) => {
    const bookId = getQueryParam("id"); // Get the book ID from the URL
    const book = books.find((b) => b.id === bookId);

    if (book) {
      document.getElementById("bookTitle").textContent = book.title;

      //this renders the details of the book
      const bookDetails = document.getElementById("bookDetails");
      bookDetails.innerHTML = `
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Year published:</strong> ${book.year}</p>
      `;

      const gallery = document.getElementById("bookCoversGallery");
      gallery.innerHTML = ""; // Clear the gallery

      // Combine the main cover and related covers for initial display
      const initialCovers = sortBooks("year", book); // Sort by year initially
      renderSortedCovers(initialCovers);

      // Add event listener for sorting dropdown
      const sortByDropdown = document.getElementById("sortBy");
      sortByDropdown.addEventListener("change", function () {
        const sortedCovers = sortBooks(this.value, book); // Sort by selected field
        renderSortedCovers(sortedCovers);
      });
    } else {
      document.getElementById("bookDetails").innerHTML =
        "<p>Book not found.</p>";
    }
  })
  .catch((error) => {
    console.error("Error loading book data:", error);
  });
