fetch("books.json")
  .then((response) => response.json())
  .then((books) => {
    const bookList = document.getElementById("bookList");
    bookList.classList.add("book-stack");

    books.forEach((book) => {
      const bookSpine = document.createElement("div");
      bookSpine.classList.add("book-spine");

      // Create a clickable title
      const bookLink = document.createElement("a");
      bookLink.href = `book.html?id=${book.id}`;
      bookLink.textContent = book.title;
      bookLink.style.textDecoration = "none";
      bookLink.style.color = "inherit";

      bookSpine.appendChild(bookLink);

      // Apply dimensions and color from JSON
      bookSpine.style.height = `${book.height}px`;
      bookSpine.style.width = `${book.width}px`;
      bookSpine.style.backgroundColor = book.color;

      bookList.appendChild(bookSpine);
    });
  })
  .catch((error) => {
    console.error("Error loading book data:", error);
  });
