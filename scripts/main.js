const myLibrary = [{title: "The Bible",
                    author: "Unknown",
                    noOfPages:"1200",
                    genre: "Scripture",
                    readOrUnread: true,
                    id: `${create_UUID()}`},
                    {title: "Eats, Shoots and Leaves",
                    author: "Lynn Truss",
                    noOfPages: "228",
                    genre: "Non-Fiction",
                    readOrUnread: true,
                    id: `${create_UUID()}`}];

const container = document.querySelector('.container');
const newBookButton = document.getElementById('new-book-button')
newBookButton.addEventListener("click", (e) => displayForm())

const addBookButton = document.getElementById("add-new-book")
addBookButton.addEventListener('click', (e) => addBookToLibrary())

function Book(title, author, noOfPages, genre, readOrUnread) {
    this.title = title
    this.author = author
    this.noOfPages = noOfPages
    this.genre = genre
    this.readOrUnread = readOrUnread
    this.id = create_UUID()
}

function addBookToLibrary() {
    let title = document.getElementById('title-input').value
    let author = document.getElementById('author-input').value
    let noOfPages = document.getElementById('pages-input').value
    let genre = document.getElementById('genre-input').value
    let readOrUnread = document.getElementById('read-radio').checked
    let newBook = new Book(title, author, noOfPages, genre, readOrUnread)
    myLibrary.push(newBook)
    document.getElementById('new-book-form').reset()
    render()
    displayForm()
}

function displayForm() {
    document.getElementById("new-book-form").classList.toggle("hidden")
}



function render() { 
    for (let i = 0; i < myLibrary.length; i++) {
        let bookInfo = document.createElement('div')
        let titleHeader = document.createElement('h3')
        let titleText = document.createTextNode(`${myLibrary[i].title}`)
        titleHeader.appendChild(titleText)
        bookInfo.appendChild(titleHeader)
        bookInfo.setAttribute("id", `${myLibrary[i].id}`)
        bookInfo.setAttribute("class", "book-card")
        if (document.getElementById(`${myLibrary[i].id}`)) { 
            continue;
        } else {
            container.appendChild(bookInfo);
        };
    }
}

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

render()

//To Do:
//Create event listener that when bookdiv is clicked, it shows information on it
//Make bookdiv background image linked to goodreads image search?
//Add a remove book button and function
//create read/unread button for each book
//data-storage