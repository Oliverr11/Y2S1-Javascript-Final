let btnAddBook = document.getElementById("btnAddBook");
let popup = document.getElementById("popup-container");
let submitBook = document.getElementById("submit-book");
let closePopUp = document.getElementById("close-btn");
let bookList = document.querySelector(".list");
let btnEdit = document.getElementById("editBtn");
let Books = [
  { id: 1, name: "Atomic Habits", author: "James Clear", copies: 15 },
  { id: 2, name: "The Secret", author: "Rhonda Byrne", copies: 6 },
  { id: 3, name: "It Ends With Us", author: "Colleen Hoover", copies: 5 },
  { id: 4, name: "C#", author: "Author's Name", copies: 76 },
  { id: 5, name: "JavaScript", author: "Marijn Haverbeke", copies: 100 },
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
      <li>ID</li>
      <li>Book Name</li>
      <li>Author</li>
      <li>Copies</li>
      <li>Edit</li>
    </ul>
  `;
  Books.forEach((book) => {
    let newBook = document.createElement("ul");
    newBook.classList.add("items");
    newBook.innerHTML = `
      <li>${book.id}</li>
      <li>${book.name}</li>
      <li>${book.author}</li>
      <li>${book.copies}</li>
      <li><button id="editBtn" class="edit-btn" data-id="${book.id}"><i class="fa-solid fa-pen-to-square"></i></button></li>
    `;
    bookList.appendChild(newBook);
  });
}

renderBooks();

submitBook.addEventListener("click", () => {
  let bookName = document.getElementById("book-name").value;
  let authorsName = document.getElementById("author-name").value;
  let numberOfCopies = document.getElementById("num-copies").value;
  numberOfCopies = parseInt(numberOfCopies);
  if (
    bookName &&
    authorsName &&
    numberOfCopies >= 0 &&
    !isNaN(numberOfCopies)
  ) {
    let bookId = Books.length + 1;
    let newBook = {
      id: bookId,
      name: bookName,
      author: authorsName,
      copies: numberOfCopies,
    };

    Books.push(newBook);
    renderBooks();
    popup.style.display = "none";
    document.getElementById("book-name").value = "";
    document.getElementById("author-name").value = "";
    document.getElementById("num-copies").value = "";
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
        <li>ID</li>
        <li>Book Name</li>
        <li>Author</li>
        <li>Copies</li>
        <li>Edit</li>
      </ul>
    `;
  filteredBooks.forEach((book) => {
    let newBook = document.createElement("ul");
    newBook.classList.add("items");
    newBook.innerHTML = `
        <li>${book.id}</li>
        <li>${book.name}</li>
        <li>${book.author}</li>
        <li>${book.copies}</li>
        <li><button id="editBtn" class="edit-btn" data-id="${book.id}"><i class="fa-solid fa-pen-to-square"></i></button></li>
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
  event.preventDefault(); // prevent page navigation
  let updatedBookName = document.getElementById("edit-book-name").value;
  let updatedAuthorName = document.getElementById("edit-author-name").value;
  let updatedCopies = parseInt(
    document.getElementById("edit-num-copies").value
  );
  if (updatedBookName && updatedAuthorName && updatedCopies >= 0) {
    bookToEdit.name = updatedBookName;
    bookToEdit.author = updatedAuthorName;
    bookToEdit.copies = updatedCopies;

    renderBooks();
    editPopup.style.display = "none";
  } else {
    alert("Please fill in all fields correctly!");
  }
});

document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    let bookId = parseInt(event.target.dataset.id);
    openEditPopup(bookId);
  }
});
