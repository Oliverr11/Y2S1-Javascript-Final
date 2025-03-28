let btnAddBook = document.getElementById("btnAddBook");
let popup = document.getElementById("popup-container");
let submitBook = document.getElementById("submit-book");
let closePopUp = document.getElementById("close-btn");
let bookList = document.querySelector(".bookList");
let btnEdit = document.getElementById("editBtn");

let saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

let loadData = (key) => {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

let Books = loadData("library-books") || [];

let Vistiors = loadData("library-visitors") || [];

let Cards = loadData("library-cards") || [];
try {
  btnAddBook.addEventListener("click", () => {
    popup.style.display = "flex";
  });
} catch (error) {
  console.log(error);
}

try {
  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
      document.getElementById("book-name").value = "";
      document.getElementById("author-name").value = "";
      document.getElementById("num-copies").value = "";
    }
  });
} catch (error) {
  console.log(error);
}

try {
  closePopUp.addEventListener("click", function () {
    popup.style.display = "none";
  });
} catch (error) {
  console.log(error);
}
try {
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
} catch (error) {
  console.log(error);
}

try {
  renderBooks();
} catch (error) {
  console.log(error);
}
try {
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
      saveData("library-books", Books);
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
} catch (error) {
  console.log(error);
}
try {
  document.getElementById("sortBtn").addEventListener("click", () => {
    let sortBy = document.querySelector("select").value;

    if (sortBy == "name") {
      Books.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy == "author's name") {
      Books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy == "number of copies") {
      Books.sort((a, b) => a.copies - b.copies);
    }

    renderBooks();
  });
} catch (error) {
  console.log(error);
}
try {
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
} catch (error) {
  console.log(error);
}
let editPopup = document.getElementById("edit-popup-container");
let closeEditPopup = document.getElementById("close-edit-popup");
let submitEditBook = document.getElementById("submit-edit-book");
let bookToEdit = null;

try {
  function openEditPopup(bookId) {
    bookToEdit = Books.find((book) => book.id == bookId);
    document.getElementById("edit-book-name").value = bookToEdit.name;
    document.getElementById("edit-author-name").value = bookToEdit.author;
    document.getElementById("edit-publisher-name").value = bookToEdit.publisher;
    document.getElementById("edit-year-publishing").value = bookToEdit.year;
    document.getElementById("edit-book-pages").value = bookToEdit.pages;
    document.getElementById("edit-num-copies").value = bookToEdit.copies;
    editPopup.style.display = "flex";
    editPopup.classList.add("show");
  }
} catch (error) {
  console.log(error);
}
try {
  closeEditPopup.addEventListener("click", () => {
    editPopup.style.display = "none";
  });
} catch (error) {
  console.log(error);
}
try {
  window.addEventListener("click", function (event) {
    if (event.target === editPopup) {
      editPopup.style.display = "none";
    }
  });
} catch (error) {
  console.log(error);
}
try {
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
      saveData("library-books", Books);

      renderBooks();
      editPopup.style.display = "none";
    } else {
      alert("Please fill in all fields correctly!");
    }
  });
} catch (error) {
  console.log(error);
}
try {
  document.querySelector(".bookList").addEventListener("click", (event) => {
    if (
      event.target.classList.contains("edit-btn") ||
      event.target.closest(".edit-btn")
    ) {
      let bookId = parseInt(event.target.closest(".edit-btn").dataset.id);
      openEditPopup(bookId);
    }
  });
} catch (error) {
  console.log(error);
}
let deleteBook = document.getElementById("delete-edit-book");
try {
  deleteBook.addEventListener("click", () => {
    const isBorrowed = Cards.some(
      (card) => card.bookId === bookToEdit.id && card.returnDate === null
    );
    if (isBorrowed) {
      alert("Cannot delete this book - it is currently borrowed!");
      return;
    }
    Books = Books.filter((book) => book.id != bookToEdit.id);
    Cards = Cards.filter((card) => card.bookId != parseInt(bookToEdit.id));
    editPopup.style.display = "none";

    saveData("library-books", Books);
    saveData("library-cards", Cards);

    renderBooks();
    renderCards();
  });
} catch (error) {
  console.log(error);
}
//visitors
let btnAddVisitor = document.getElementById("btnAddVisitor");
let submitVisitor = document.getElementById("submit-visitor");
let VistiorsList = document.querySelector(".visitorList");

try {
  function renderVistiors() {
    VistiorsList.innerHTML = `
    <ul class="header">
      <li id="id">ID</li>
      <li>Visitor Name</li>
      <li>Visitor Phone</li>
      <li id="edit">Edit</li>
    </ul>
    `;
    Vistiors.forEach((visitor) => {
      let newVisitor = document.createElement("ul");
      newVisitor.classList.add("items");
      newVisitor.innerHTML = `
      <li  id="id">${visitor.id}</li>
      <li>${visitor.name}</li>
      <li>${visitor.phone}</li>
      <li  id="edit"><button id="editBtn" class="edit-btn" data-id="${visitor.id}"><i class="fa-solid fa-pen-to-square"></i></button></li>
      `;
      VistiorsList.appendChild(newVisitor);
    });
  }
} catch (error) {
  console.log(error);
}
try {
  renderVistiors();
} catch (error) {
  console.log(error);
}
try {
  btnAddVisitor.addEventListener("click", () => {
    popup.style.display = "flex";
  });
} catch (error) {
  console.log(error);
}
try {
  submitVisitor.addEventListener("click", () => {
    let visitorName = document.getElementById("visitor-name").value;
    let visitorPhone = document.getElementById("phone-number").value;
    if (visitorName && visitorPhone) {
      let maxId =
        Vistiors.length > 0
          ? Math.max(...Vistiors.map((visitor) => visitor.id))
          : 0;
      let visitorId = maxId + 1;
      let newVisitor = {
        id: visitorId,
        name: visitorName,
        phone: visitorPhone,
      };
      Vistiors.push(newVisitor);
      renderVistiors();
      saveData("library-visitors", Vistiors);
      popup.style.display = "none";
      document.getElementById("visitor-name").value = "";
      document.getElementById("phone-number").value = "";
    } else {
      alert("Please fill in the information correctly!");
    }
  });
} catch (error) {
  console.log(error);
}

try {
  document.getElementById("sortBtn").addEventListener("click", () => {
    let sortBy = document.querySelector("select").value;
    if (sortBy == "id") {
      Vistiors.sort((a, b) => a.id - b.id);
    } else if (sortBy == "name") {
      Vistiors.sort((a, b) => a.name.localeCompare(b.name));
    }
    renderVistiors();
  });
} catch (error) {
  console.log(error);
}
try {
  document.getElementById("btnSearch").addEventListener("click", () => {
    let query = document.querySelector("#search").value.toLowerCase();
    let filteredVistors = Vistiors.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(query) ||
        visitor.phone.includes(query)
    );
    VistiorsList.innerHTML = `
     <ul class="header">
      <li id="id">ID</li>
      <li>Visitor Name</li>
      <li>Visitor Phone</li>
      <li id="edit">Edit</li>
    </ul>
    `;
    filteredVistors.forEach((visitor) => {
      let newVisitor = document.createElement("ul");
      newVisitor.classList.add("items");
      newVisitor.innerHTML = `
      <li  id="id">${visitor.id}</li>
      <li>${visitor.name}</li>
      <li>${visitor.phone}</li>
      <li  id="edit"><button id="editBtn" class="edit-btn" data-id="${visitor.id}"><i class="fa-solid fa-pen-to-square"></i></button></li>
      `;
      VistiorsList.appendChild(newVisitor);
    });
  });
} catch (error) {
  console.log(error);
}
let editVistorPopup = document.getElementById("edit-popup-container");
let closeEditVistorPopup = document.getElementById("close-edit-popup");
let submitEditVitor = document.getElementById("submit-edit-visitor");
let deleteVistor = document.getElementById("delete-edit-vistor");
let visitorToEdit = null;

try {
  function openVistorEditPopup(visitorId) {
    visitorToEdit = Vistiors.find((visitor) => visitor.id == visitorId);
    document.getElementById("edit-visitor-name").value = visitorToEdit.name;
    document.getElementById("edit-visitor-phone").value = visitorToEdit.phone;
    editVistorPopup.style.display = "flex";
  }
} catch (error) {
  console.log(error);
}
try {
  document.querySelector(".visitorList").addEventListener("click", (event) => {
    if (
      event.target.classList.contains("edit-btn") ||
      event.target.closest(".edit-btn")
    ) {
      let vistorId = parseInt(event.target.closest(".edit-btn").dataset.id);
      openVistorEditPopup(vistorId);
    }
  });
} catch (error) {
  console.log(error);
}
try {
  submitEditVitor.addEventListener("click", () => {
    let updateVistorName = document.getElementById("edit-visitor-name").value;
    let updateVistorPhone = document.getElementById("edit-visitor-phone").value;
    if (updateVistorName && updateVistorPhone) {
      visitorToEdit.name = updateVistorName;
      visitorToEdit.phone = updateVistorPhone;
      saveData("library-visitors", Vistiors);

      renderVistiors();
      editPopup.style.display = "none";
    } else {
      alert("Please fill in all fields correctly!");
    }
  });
} catch (error) {
  console.log(error);
}
try {
  deleteVistor.addEventListener("click", () => {
    const hasActiveBorrowings = Cards.some((card) => {
      if (card.vistorId === visitorToEdit.id) {
        if (card.returnDate == null) {
          return true;
        }
        return false;
      }
    });
    if (hasActiveBorrowings) {
      alert("Cannot delete this visitor - they have active book borrowings!");
      return;
    }

    Vistiors = Vistiors.filter((vistor) => vistor.id != visitorToEdit.id);
    Cards = Cards.filter((card) => card.vistorId != visitorToEdit.id);
    editPopup.style.display = "none";

    saveData("library-visitors", Vistiors);
    saveData("library-cards", Cards);

    renderVistiors();
    renderCards();
  });
} catch (error) {
  console.log(error);
}

//cards

let btnAddCard = document.getElementById("btnAddCard");
let submitCard = document.getElementById("submit-card");
let cardList = document.querySelector(".cardList");

function formatDate(date) {
  if (!date === null) return "";
  return new Date(date).toLocaleDateString("en-US"); // ex: "3/26/2025"
}

try {
  function renderCards() {
    cardList.innerHTML = `
    <ul class="header">
      <li id="id">ID</li>
      <li>Visitor Name</li> 
      <li>Book</li>
      <li>Borrow Date</li>
      <li id="return">Return Date</li>
    </ul>`;
    Cards.forEach((card) => {
      let visitor = Vistiors.find(
        (v) => parseInt(v.id) === parseInt(card.vistorId)
      );
      let visitorName = visitor ? visitor.name : "Unknown Visitor";
      let book = Books.find((b) => parseInt(b.id) === parseInt(card.bookId));
      let bookName = book ? book.name : "Unknown Book";

      let borrowDateFormatted = formatDate(card.borrowDate);
      let returnDateFormatted = formatDate(card.returnDate);

      let newCard = document.createElement("ul");
      newCard.classList.add("items");
      newCard.innerHTML = `
      <li  id="id">${card.id}</li>
      <li>${visitorName}</li>
      <li>${bookName}</li>
      <li>${borrowDateFormatted}</li>
      <li  id="return"><button id="editBtn" class="edit-btn" data-id="${
        card.id
      }">${
        card.returnDate == null
          ? '<i class="fa-solid fa-rotate-left"></i>'
          : returnDateFormatted
      }</button></li>
      `;
      cardList.append(newCard);
    });
  }
} catch (error) {
  console.log(error);
}
try {
  renderCards();
} catch (error) {
  console.log(error);
}
try {
  let visitorSelect = document.getElementById("card-visitor-name");
  Vistiors.forEach((visitor) => {
    let option = document.createElement("option");
    option.value = visitor.id;
    option.textContent = visitor.name;
    visitorSelect.appendChild(option);
  });
} catch (error) {
  console.log(error);
}
try {
  let bookSelect = document.getElementById("card-book-name");
  Books.forEach((book) => {
    let option = document.createElement("option");
    option.value = book.id;
    option.textContent = book.name;
    bookSelect.appendChild(option);
  });
} catch (error) {
  console.log(error);
}

try {
  btnAddCard.addEventListener("click", () => {
    popup.style.display = "flex";
  });
} catch (error) {
  console.log(error);
}
try {
  submitCard.addEventListener("click", () => {
    let vistorId = document.getElementById("card-visitor-name").value;
    console.log("visitor id : " + vistorId);
    let bookId = document.getElementById("card-book-name").value;
    if (vistorId && bookId) {
      let maxId =
        Cards.length > 0 ? Math.max(...Cards.map((card) => card.id)) : 0;
      let cardId = maxId + 1;

      const book = Books.find((b) => b.id == parseInt(bookId));
      const visitor = Vistiors.find((v) => v.id == parseInt(vistorId));

      if (book.copies > 0) {
        let newCard = {
          id: cardId,
          vistorId: parseInt(vistorId),
          bookId: parseInt(bookId),
          borrowDate: new Date(), // set current date
          returnDate: null,
        };
        book.copies -= 1;
        book.borrowedCount += 1;
        visitor.booksBorrowed += 1;
        Cards.push(newCard);

        saveData("library-cards", Cards);
        saveData("library-books", Books);
        saveData("library-visitors", Vistiors);

        popup.style.display = "none";
        document.getElementById("card-visitor-name").value = "";
        document.getElementById("card-book-name").value = "";
        renderCards();
        renderBooks();
      } else {
        alert("Don't have enough books");
      }
    } else {
      alert("Please fill in the information correctly!");
    }
  });
} catch (error) {
  console.log(error);
}

let editCardPopup = document.getElementById("edit-popup-container");
let submitEditCard = document.getElementById("submit-edit-card");
let cardToEdit = null;
try {
  document.querySelector(".cardList").addEventListener("click", (event) => {
    if (
      event.target.classList.contains("edit-btn") ||
      event.target.closest(".edit-btn")
    ) {
      let cardId = parseInt(event.target.closest(".edit-btn").dataset.id);
      let currentDate = formatDate(new Date());
      let card = Cards.find((c) => c.id == cardId);

      if (card.returnDate == null) {
        card.returnDate = currentDate;
        const book = Books.find((b) => b.id === parseInt(card.bookId));
        book.copies += 1;

        saveData("library-cards", Cards);
        saveData("library-books", Books);

        renderCards();
        renderBooks();
      }
    }
  });
} catch (error) {
  console.log(error);
}

try {
  //sort Cards
  document.getElementById("sortBtn").addEventListener("click", () => {
    let sortBy = document.querySelector("select").value;
    if (sortBy == "return") {
      Cards.sort((a, b) => {
        if (a.returnDate === null && b.returnDate === null) return 0;
        if (a.returnDate === null) return 1; // a is null, put it after b
        if (b.returnDate === null) return -1; // b is null, put it after a

        let dateA = new Date(a.returnDate);
        let dateB = new Date(b.returnDate);

        return dateA - dateB;
      });
    } else if (sortBy == "borrow") {
      Cards.sort((a, b) => {
        if (a.borrowDate === null && b.borrowDate === null) return 0; // if both are null, no change
        if (a.borrowDate === null) return 1;
        if (b.borrowDate === null) return -1;

        let dateA = new Date(a.borrowDate);
        let dateB = new Date(b.borrowDate);

        return dateA - dateB;
      });
    }
    renderCards();
  });
} catch (error) {
  console.log(error);
}

try {
  document.getElementById("btnSearch").addEventListener("click", () => {
    let query = document.querySelector("#search").value.toLowerCase();

    let filteredCards = Cards.filter((card) => {
      let visitor = Vistiors.find((v) => v.id == card.vistorId);
      let visitorName = visitor ? visitor.name.toLowerCase() : "";
      let book = Books.find((b) => b.id == card.bookId);
      let bookName = book ? book.name.toLowerCase() : "";
      return visitorName.includes(query) || bookName.includes(query);
    });

    cardList.innerHTML = `
     <ul class="header">
      <li id="id">ID</li>
      <li>Visitor Name</li> 
      <li>Book</li>
      <li>Borrow Date</li>
      <li id="return">Return Date</li>
    </ul>
    `;
    filteredCards.forEach((card) => {
      let visitor = Vistiors.find((v) => v.id == card.vistorId);
      let visitorName = visitor ? visitor.name : "";

      let book = Books.find((b) => b.id == card.bookId);
      let bookName = book ? book.name : "";

      let borrowDateFormatted = formatDate(card.borrowDate);
      let returnDateFormatted = formatDate(card.returnDate);
      let newCard = document.createElement("ul");
      newCard.classList.add("items");
      newCard.innerHTML = `
      <li  id="id">${card.id}</li>
      <li>${visitorName}</li>
      <li>${bookName}</li>
      <li>${borrowDateFormatted}</li>
      <li  id="return"><button id="editBtn" class="edit-btn" data-id="${
        card.id
      }">${
        card.returnDate == null
          ? '<i class="fa-solid fa-rotate-left"></i>'
          : returnDateFormatted
      }</button></li>
      `;
      saveData("library-cards", Cards);

      cardList.appendChild(newCard);
    });
  });
} catch (error) {
  console.log(error);
}

function getMostPopularBooks() {
  return [...Books]
    .sort((a, b) => b.borrowedCount - a.borrowedCount)
    .slice(0, 5);
}

function getMostActiveVisitors() {
  return [...Vistiors]
    .sort((a, b) => b.booksBorrowed - a.booksBorrowed)
    .slice(0, 5);
}

function renderStatistics() {
  const sortBy = document.querySelector("select").value;
  const topBookList = document.querySelector(".topBookList");
  const topVisitorList = document.querySelector(".topVisitorList");

  topBookList.innerHTML = "";
  topVisitorList.innerHTML = "";

  if (sortBy === "popular-books") {
    const popularBooks = getMostPopularBooks();

    topBookList.innerHTML = `
      <ul class="header">
        <li>Book Name</li>
        <li>Author</li>
        <li>Borrowed</li>
      </ul>
    `;

    popularBooks.forEach((book) => {
      const bookItem = document.createElement("ul");
      bookItem.classList.add("items");
      bookItem.innerHTML = `
        <li>${book.name}</li>
        <li>${book.author}</li>
        <li>${book.borrowedCount}</li>
      `;
      topBookList.appendChild(bookItem);
    });
  } else if (sortBy === "active-visitor") {
    const activeVisitors = getMostActiveVisitors();

    topVisitorList.innerHTML = `
      <ul class="header">
        <li>Visitor Name</li>
        <li>Phone</li>
        <li>Books Borrowed</li>
      </ul>
    `;

    activeVisitors.forEach((visitor) => {
      const visitorItem = document.createElement("ul");
      visitorItem.classList.add("items");
      visitorItem.innerHTML = `
        <li>${visitor.name}</li>
        <li>${visitor.phone}</li>
        <li>${visitor.booksBorrowed}</li>
      `;
      topVisitorList.appendChild(visitorItem);
    });
  }
}

try {
  document
    .getElementById("sortBtn")
    .addEventListener("click", () => renderStatistics());

  document.querySelector("select").value = "popular-books";
  renderStatistics();
} catch (error) {
  console.log(error);
}
