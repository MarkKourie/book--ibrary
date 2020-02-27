const myLibrary = [{title: "The Bible",
                    author: "Unknown",
                    noOfPages:"1200",
                    genre: "Scripture",
                    readOrUnread: true,
                    id: create_UUID()},
                    {title: "Eats, Shoots and Leaves",
                    author: "Lynn Truss",
                    noOfPages: "228",
                    genre: "Non-Fiction",
                    readOrUnread: true,
                    id: create_UUID()}];

const bookshelf = document.querySelector('#bookshelf');
const formSpace = document.querySelector('#form-space')
const newBookButton = document.getElementById('new-book-button')
newBookButton.addEventListener("click", (e) => displayForm())

const addBookButton = document.getElementById("add-new-book")
addBookButton.addEventListener('click', (e) => addBookToLibrary())

function addFlipping(cards) {
    cards.forEach((card) => {
           card.addEventListener('click', (e) => flipCard(card))
    })
}


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
    let readOrUnread = document.getElementById('read-it-checkbox').checked
    let newBook = new Book(title, author, noOfPages, genre, readOrUnread)
    myLibrary.push(newBook)
    document.getElementById('new-book-form').reset()
    render()
    displayForm()
    var latestCard = [document.querySelector(`[data-index-number='${myLibrary.length - 1}']`)]
    addFlipping(latestCard)
}

function removeBookFromLibrary(target) {
    myLibrary.splice(parseInt(target.dataset.indexNumber), 1)
    target.remove()
    reIndexLibrary()
    render()
}

function markAsReadOrUnread(checkbox, target) {
    //Changes read/unread status of object according to whether button checked or not
    if (checkbox.checked) {
        myLibrary[parseInt(target.dataset.indexNumber)].readOrUnread = true
    } else {
        myLibrary[parseInt(target.dataset.indexNumber)].readOrUnread = false
    }
}

function displayForm() {
    document.getElementById("new-book-form").classList.toggle("hidden")
}

function render() { 
    for (let i = 0; i < myLibrary.length; i++) {
        if (! document.getElementById(`${myLibrary[i].id}`)) {
            let bookInfo = document.createElement('div')
            renderTitle(i, bookInfo)
            bookInfo.setAttribute("id", `${myLibrary[i].id}`)
            bookInfo.setAttribute("class", "book-card")
            bookInfo.setAttribute("data-index-number", `${i}`)
            bookshelf.appendChild(bookInfo);
        } else {
            continue;
        }
    };
}

function reIndexLibrary() {
    //changes the data-index-number attribute of all book cards to match the new library index
    var bookCards = document.querySelectorAll('.book-card')
    bookCards.forEach((card) => {
        let renewedPosition = myLibrary.map(book => book.id).indexOf(card.id)
        card.setAttribute("data-index-number", `${renewedPosition}`)
    })
}
    

//I used this for a unique id
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function renderTitle(i, card) {
    let titleHeader = document.createElement('h3')
    titleHeader.textContent = myLibrary[i].title
    card.appendChild(titleHeader)
}

function flipCard(card) {
    card.classList.toggle("flipped")
    let i = parseInt(card.dataset.indexNumber) 
    if (card.classList.contains("flipped")) {
        let bookInfoBack = document.createElement('div')
        let authorInfo = document.createElement('p')
        authorInfo.textContent = `Author: ${myLibrary[i].author}`
        let noOfPagesPara = document.createElement('p')
        noOfPagesPara.textContent= `No of Pages: ${myLibrary[i].noOfPages}`
        let genreInfo = document.createElement('p')
        genreInfo.textContent = `Genre: ${myLibrary[i].genre}`
        let removeButton = document.createElement('button')
        removeButton.textContent = `Remove Book`
        removeButton.addEventListener('click', (e) => removeBookFromLibrary(card) )
        
        let littleForm = document.createElement('form')
        littleForm.setAttribute("class", "little-form")
        littleForm.setAttribute("id", `read-unread-${myLibrary[i].title}`)
        let checkIfRead = document.createElement('input')
        checkIfRead.setAttribute("type", "checkbox")
        littleForm.textContent = `Have you finished reading '${myLibrary[i].title}'?`
        myLibrary[i].readOrUnread ? checkIfRead.checked = true : checkIfRead.checked = false;
        littleForm.appendChild(checkIfRead)
        checkIfRead.addEventListener('change', (e) => markAsReadOrUnread(checkIfRead, card))


        bookInfoBack.appendChild(authorInfo)
        bookInfoBack.appendChild(noOfPagesPara)
        bookInfoBack.appendChild(genreInfo)
        bookInfoBack.appendChild(removeButton)
        formSpace.appendChild(littleForm)
        
        card.removeChild(card.childNodes[0])
        card.appendChild(bookInfoBack)
    } else {
        card.removeChild(card.childNodes[0])
        renderTitle(i, card)
        littleForm = document.getElementById(`read-unread-${myLibrary[i].title}`)
        littleForm.parentNode.removeChild(littleForm) 
    }
}

render() 
var cards = document.querySelectorAll('.book-card') //must be placed after render for first instance of cards to be flippable
addFlipping(cards)

//To Do:
//Make bookdiv background image linked to goodreads image search?
//data-storage