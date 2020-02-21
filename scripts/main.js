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

const container = document.querySelector('.container');
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
    let readOrUnread = document.getElementById('read-radio').checked
    let newBook = new Book(title, author, noOfPages, genre, readOrUnread)
    myLibrary.push(newBook)
    document.getElementById('new-book-form').reset()
    render()
    displayForm()
    var latestCard = [document.querySelector(`[data-index-number='${myLibrary.length - 1}']`)]
    addFlipping(latestCard)
}

function displayForm() {
    document.getElementById("new-book-form").classList.toggle("hidden")
}

function render() { //This may be better if bookInfo is created only after establishing whether it's already there or not
    for (let i = 0; i < myLibrary.length; i++) {
        let bookInfo = document.createElement('div')
        renderTitle(i, bookInfo)
        bookInfo.setAttribute("id", `${myLibrary[i].id}`)
        bookInfo.setAttribute("class", "book-card")
        bookInfo.setAttribute("data-index-number", `${i}`)
        if (document.getElementById(`${myLibrary[i].id}`)) { 
            continue;
        } else {
            container.appendChild(bookInfo);
        };
    }
    
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
        bookInfoBack.appendChild(authorInfo)
        bookInfoBack.appendChild(noOfPagesPara)
        bookInfoBack.appendChild(genreInfo)
        card.removeChild(card.childNodes[0])
        card.appendChild(bookInfoBack)
    } else {
        card.removeChild(card.childNodes[0])
        renderTitle(i, card)
    }
}

render() //took addFlipping out of render to see if I can make it so the event is only ever added to a card once. Still not working
var cards = document.querySelectorAll('.book-card') //must be placed after render
addFlipping(cards)

//To Do:
//Make bookdiv background image linked to goodreads image search?
//Add a remove book button and function
//create read/unread button for each book
//data-storage