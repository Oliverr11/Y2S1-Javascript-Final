let btnAddBook = document.getElementById("btnAddBook");
let popup = document.getElementById("popup-container");
let submitBook = document.getElementById("submit-book");
let closePopUp = document.getElementById("close-btn");
let bookList = document.querySelector(".list");
let btnEdit = document.getElementById("editBtn");
let Books = [
  {
    id: 1,
    name: "Atomic Habits",
    author: "James Clear",
    publisher: "Avery",
    pages: 320,
    year: 2018,
    copies: 15,
  },
  {
    id: 2,
    name: "The Secret",
    author: "Rhonda Byrne",
    publisher: "Atria Books",
    pages: 198,
    year: 2006,
    copies: 6,
  },
  {
    id: 3,
    name: "It Ends With Us",
    author: "Colleen Hoover",
    publisher: "Atria Books",
    pages: 384,
    year: 2016,
    copies: 5,
  },
  {
    id: 4,
    name: "C#",
    author: "Author's Name",
    publisher: "Some Publisher",
    pages: 450,
    year: 2020,
    copies: 76,
  },
  {
    id: 5,
    name: "JavaScript",
    author: "Marijn Haverbeke",
    publisher: "No Starch Press",
    pages: 472,
    year: 2018,
    copies: 100,
  },
  {
    id: 6,
    name: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    publisher: "Addison-Wesley",
    pages: 352,
    year: 1999,
    copies: 120,
  },
  {
    id: 7,
    name: "Clean Code",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    pages: 464,
    year: 2008,
    copies: 150,
  },
  {
    id: 8,
    name: "Design Patterns",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    publisher: "Addison-Wesley",
    pages: 395,
    year: 1994,
    copies: 90,
  },
  {
    id: 9,
    name: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    publisher: "Addison-Wesley",
    pages: 322,
    year: 1975,
    copies: 85,
  },
  {
    id: 10,
    name: "The Clean Coder",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    pages: 304,
    year: 2011,
    copies: 110,
  },
  {
    id: 11,
    name: "You Don't Know JS",
    author: "Kyle Simpson",
    publisher: "O'Reilly Media",
    pages: 200,
    year: 2014,
    copies: 130,
  },
  {
    id: 12,
    name: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    publisher: "Addison-Wesley",
    pages: 672,
    year: 1968,
    copies: 50,
  },
  {
    id: 13,
    name: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    publisher: "No Starch Press",
    pages: 472,
    year: 2011,
    copies: 200,
  },
  {
    id: 14,
    name: "Java: The Complete Reference",
    author: "Herbert Schildt",
    publisher: "McGraw-Hill",
    pages: 1248,
    year: 2018,
    copies: 70,
  },
  {
    id: 15,
    name: "Python Crash Course",
    author: "Eric Matthes",
    publisher: "No Starch Press",
    pages: 544,
    year: 2019,
    copies: 140,
  },
];

btnAddBook.addEventListener("click", () => {
  popup.style.display = "flex";
});

window.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.style.display = "none";
    document.getElementById("book-name").value = "";
    document.getElementById("author-name").value = "";
    document.getElementById("num-copies").value = "";
  }
});

closePopUp.addEventListener("click", function () {
  popup.style.display = "none";
});

function renderBooks() {
  bookList.innerHTML = `
    <ul class="header">
      <li id="id">ID</li>
      <li>Book Name</li>
      <li>Author</li>
      <li>Publisher</li>
      <li  id="year">Year</li>
      <li id="pages">Pages</li>
      <li id="copies">Copies</li>
      <li id="edit">Edit</li>
    </ul>
  `;
  Books.forEach((book) => {
    let newBook = document.createElement("ul");
    newBook.classList.add("items");
    newBook.innerHTML = `
      <li  id="id">${book.id}</li>
      <li>${book.name}</li>
      <li>${book.author}</li>
      <li>${book.publisher}</li>
      <li id="year">${book.year}</li>
      <li  id="pages">${book.pages}</li>
      <li id="copies">${book.copies}</li>
      <li  id="edit"><button id="editBtn" class="edit-btn" data-id="${book.id}"><i class="fa-solid fa-pen-to-square"></i></button></li>
    `;
    bookList.appendChild(newBook);
  });
}

renderBooks();

submitBook.addEventListener("click", () => {
  let bookName = document.getElementById("book-name").value;
  let authorsName = document.getElementById("author-name").value;
  let publisherName = document.getElementById("publisher-name").value;
  let publishYear = document.getElementById("publish-year").value;
  publishYear = parseInt(publishYear);
  let bookPages = document.getElementById("book-pages").value;
  bookPages = parseInt(bookPages);
  let numberOfCopies = document.getElementById("num-copies").value;
  numberOfCopies = parseInt(numberOfCopies);
  if (
    bookName &&
    authorsName &&
    numberOfCopies >= 0 &&
    publisherName &&
    publishYear >= 0 &&
    bookPages >= 0 &&
    !isNaN(bookPages) &&
    !isNaN(publishYear) &&
    !isNaN(numberOfCopies)
  ) {
    let maxId =
      Books.length > 0 ? Math.max(...Books.map((book) => book.id)) : 0;

    let bookId = maxId + 1;
    let newBook = {
      id: bookId,
      name: bookName,
      author: authorsName,
      publisher: publisherName,
      year: publishYear,
      pages: bookPages,
      copies: numberOfCopies,
    };

    Books.push(newBook);
    renderBooks();
    popup.style.display = "none";
    document.getElementById("book-name").value = "";
    document.getElementById("author-name").value = "";
    document.getElementById("num-copies").value = "";
    document.getElementById("publish-year").value = "";
    document.getElementById("book-pages").value = "";
    document.getElementById("publisher-name").value = "";
  } else {
    alert("Please fill in the information correctly!");
  }
});

document.getElementById("sortBtn").addEventListener("click", () => {
  let sortBy = document.querySelector("select").value;

  if (sortBy === "name") {
    Books.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "author's name") {
    Books.sort((a, b) => a.author.localeCompare(b.author));
  } else if (sortBy === "number of copies") {
    Books.sort((a, b) => a.copies - b.copies);
  }

  renderBooks();
});

document.getElementById("btnSearch").addEventListener("click", () => {
  let query = document.querySelector("#search").value.toLowerCase();

  let filteredBooks = Books.filter(
    (book) =>
      book.name.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  );

  bookList.innerHTML = `
      <ul class="header">
      <li id="id">ID</li>
      <li>Book Name</li>
      <li>Author</li>
      <li>Publisher</li>
      <li  id="year">Year</li>
      <li  id="pages">Pages</li>
      <li id="copies">Copies</li>
      <li id="edit">Edit</li>
      </ul>
    `;
  filteredBooks.forEach((book) => {
    let newBook = document.createElement("ul");
    newBook.classList.add("items");
    newBook.innerHTML = `
        <li id="id">${book.id}</li>
        <li>${book.name}</li>
        <li>${book.author}</li>
        <li>${book.publisher}</li>
        <li id="year">${book.year}</li>
        <li  id="pages">${book.pages}</li>
        <li id="copies">${book.copies}</li>
        <li id="edit"><button id="editBtn" class="edit-btn" data-id="${book.id}"><i class="fa-solid fa-pen-to-square"></i></button></li>
      `;
    bookList.appendChild(newBook);
  });
});

let editPopup = document.getElementById("edit-popup-container");
let closeEditPopup = document.getElementById("close-edit-popup");
let submitEditBook = document.getElementById("submit-edit-book");
let bookToEdit = null;

function openEditPopup(bookId) {
  bookToEdit = Books.find((book) => book.id === bookId);
  document.getElementById("edit-book-name").value = bookToEdit.name;
  document.getElementById("edit-author-name").value = bookToEdit.author;
  document.getElementById("edit-publisher-name").value = bookToEdit.publisher;
  document.getElementById("edit-year-publishing").value = bookToEdit.year;
  document.getElementById("edit-book-pages").value = bookToEdit.pages;
  document.getElementById("edit-num-copies").value = bookToEdit.copies;
  editPopup.style.display = "flex";
}

closeEditPopup.addEventListener("click", () => {
  editPopup.style.display = "none";
});
window.addEventListener("click", function (event) {
  if (event.target === editPopup) {
    editPopup.style.display = "none";
  }
});
submitEditBook.addEventListener("click", (event) => {
  let updatedBookName = document.getElementById("edit-book-name").value;
  let updatedAuthorName = document.getElementById("edit-author-name").value;
  let updatedPublisherName = document.getElementById(
    "edit-publisher-name"
  ).value;
  let updateYearPublishing = document.getElementById(
    "edit-year-publishing"
  ).value;
  updateYearPublishing = parseInt(updateYearPublishing);
  let updateBookPages = document.getElementById("edit-book-pages").value;
  updateBookPages = parseInt(updateBookPages);
  let updatedCopies = parseInt(
    document.getElementById("edit-num-copies").value
  );
  if (
    updatedBookName &&
    updatedAuthorName &&
    updatedPublisherName &&
    updateYearPublishing > 0 &&
    !isNaN(updateYearPublishing) &&
    updateBookPages > 0 &&
    !isNaN(updateBookPages) &&
    updatedCopies >= 0 &&
    !isNaN(updatedCopies)
  ) {
    bookToEdit.name = updatedBookName;
    bookToEdit.author = updatedAuthorName;
    bookToEdit.publisher = updatedPublisherName;
    bookToEdit.year = updateYearPublishing;
    bookToEdit.pages = updateBookPages;
    bookToEdit.copies = updatedCopies;

    renderBooks();
    editPopup.style.display = "none";
  } else {
    alert("Please fill in all fields correctly!");
  }
});

document.querySelector(".list").addEventListener("click", (event) => {
  if (
    event.target.classList.contains("edit-btn") ||
    event.target.closest(".edit-btn")
  ) {
    let bookId = parseInt(event.target.closest(".edit-btn").dataset.id);
    openEditPopup(bookId);
  }
});

let deleteBook = document.getElementById("delete-edit-book");
deleteBook.addEventListener("click", () => {
  Books = Books.filter((book) => book.id != bookToEdit.id);
  renderBooks();
  editPopup.style.display = "none";
  console.log(Books);
});
