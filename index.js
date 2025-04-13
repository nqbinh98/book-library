const myLibrary = [];

const library = document.querySelector(".library");
const btnAdd = document.querySelector(".addBtn");
const modal = document.querySelector(".modal");
const formInput = document.querySelector(".form-input");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const statusInput = document.querySelector("#status-input");

function Book(title, author, pages, read) {

  // the constructor...

  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor")
  }
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === "Read" ? "Not read" : "Read"
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array

  let newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook);
  displayLibrary(myLibrary);

}

function displayLibrary (arr) {
    library.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        let book = arr[i];

        // Create element
        const item = document.createElement("div");
        const title = document.createElement("div");
        const author = document.createElement("div");
        const pages = document.createElement("div");
        const btnDelete = document.createElement("button");
        const status = document.createElement("div");
        const statusSpan = document.createElement("span");
        const changeBtn = document.createElement("button");

        // Add content, class, id
        status.textContent = "Status: ";
        statusSpan.textContent = book.read;
        changeBtn.dataset.bookId = book.id;
        changeBtn.classList = "changeStatus";
        changeBtn.textContent = "Change";
        item.classList = 'item';
        author.classList = 'author';
        pages.classList = 'pages';
        status.classList = 'status';
        title.classList = 'title';
        btnDelete.classList = 'deleteBtn';
        btnDelete.dataset.bookId = book.id
        title.innerHTML = `Title: <span>${book.title}</span>`;
        author.innerHTML = `Author: <span>${book.author}</span>`;
        pages.innerHTML = `Pages: <span>${book.pages}</span>`;
        btnDelete.innerHTML = `Delete`;

        // add elements to library for display
        status.append(statusSpan, changeBtn);
        item.append(title, author, pages, status, btnDelete);
        library.append(item);
    }
}

// handle event delete item and change status
library.addEventListener('click', function (e) {

  if (e.target.classList.contains('deleteBtn')) {
    let idDelete = e.target.dataset.bookId;
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id == idDelete) {
        myLibrary.splice(i,1);
        displayLibrary(myLibrary);
        break;
      }
    }
  }

  if (e.target.classList.contains('changeStatus')) {
    let idChange = e.target.dataset.bookId;
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id == idChange) {
        myLibrary[i].toggleReadStatus()
        displayLibrary(myLibrary);
        break;
      }
    }
  }
})

// show form to add new book
btnAdd.addEventListener('click', function () {
  if(modal.classList.contains('hide')) {
    modal.classList.remove('hide');
  } else {
    modal.classList.add('hide');
  }
})

// submit form add new book
formInput.onsubmit = function (e) {
  e.preventDefault();
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = statusInput.value;

  modal.classList.add('hide');
  addBookToLibrary(title, author, pages, read);
  displayLibrary(myLibrary);

}