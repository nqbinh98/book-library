const library = document.querySelector(".library");
const btnAdd = document.querySelector(".addBtn");
const modal = document.querySelector(".modal");
const formInput = document.querySelector(".form-input");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const statusInput = document.querySelector("#status-input");

class Book {
  constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = read;
    this.id = crypto.randomUUID();

    let pagesNumb = Number(pages);
    if (isNaN(pagesNumb) || pagesNumb <= 0) {
      throw new Error("Pages must be a positive number.") 
    }
  }

  toggleReadStatus() {
    this.read = this.read === "Read" ? "Not read" : "Read";
  }

  static addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
    displayLibrary(myLibrary);
  
  }
}

const myLibrary = [
  new Book('Harry Potter', 'J. K. Rowling', '500', 'Read'),
  new Book('The Hobbit', 'J. R. R. Tolkien', '500', 'Not read')
];

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
  // Handle delete btn
  if (e.target.classList.contains('deleteBtn')) {
    let idDelete = e.target.dataset.bookId;

    const index = myLibrary.findIndex(book => book.id === idDelete);
    if (index !== -1) {
      myLibrary.splice(index,1);
      displayLibrary(myLibrary);
    }
  }
  // Handle change status btn
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
  modal.classList.toggle("hide")
})

// submit form add new book
formInput.onsubmit = function (e) {
  e.preventDefault();
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = Number(pagesInput.value);
  let read = statusInput.value;
  if (isNaN(pages) || pages <= 0) {
    alert("Pages must be a positive number.") 
  }

  modal.classList.add('hide');
  Book.addBookToLibrary(title, author, pages, read);
  displayLibrary(myLibrary);
  
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  statusInput.value = 'Read';
}
displayLibrary(myLibrary);