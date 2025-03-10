fetch("books.json")
  .then((response) => response.json())
  .then((books) => {
    const bookList = document.getElementById("bookList");

    books.forEach((book) => {
      const bookLink = document.createElement("a");
      bookLink.href = `book.html?id=${book.id}`; // Link to the book's detail page
      bookLink.textContent = book.title;

      const bookItem = document.createElement("div");
      bookItem.classList.add("book-item");
      bookItem.appendChild(bookLink);

      bookList.appendChild(bookItem);
    });
  })
  .catch((error) => {
    console.error("Error loading book data:", error);
  });
