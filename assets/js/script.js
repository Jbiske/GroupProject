var searchInput = document.querySelector("#book");
var searchEl = document.querySelector("#search-form");
var resultContainer = document.querySelector(".resultContainer");
var popularContainerEl = document.querySelector(".popularContainer");
var recentSearchEl = document.querySelector(".recentSearch");

console.log(searchEl);

// searches for book in api
var searchBook = function (event) {
    event.preventDefault();

    var bookSearch = searchInput.value;
    console.log(bookSearch);
    var apiURL = "https://openlibrary.org/search.json?limit=10&title=" + bookSearch;

    console.log(apiURL);
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    listBooks(data);
                })
            }

        })
        .catch(function (error) {
            // alert if something goes wrong
            alert("There is an error with request");
        });

    searchInput.value = "";

}

// list the book results
var listBooks = function (bookSearch) {
    resultContainer.textContent = "";
    console.log(bookSearch);
    var totalBooks = bookSearch.docs

    // loop results to print in page
    for (var i = 0; i < totalBooks.length; i++) {


        // If statement is to check if they are books that provide info
        if (totalBooks[i].lending_edition_s) {
            var bookName = totalBooks[i].title;
            console.log(bookName);

            var bookSearchDiv = document.createElement("div")
            bookSearchDiv.classList = "card horizontal col small s6 m5 space"

            var bookSearchContentDiv = document.createElement("div")
            bookSearchContentDiv.className = "card-stacked"

            var bookDetailDiv = document.createElement("div")
            bookDetailDiv.className = "card-content"

            var linkDiv = document.createElement("div")
            linkDiv.className = "card-action"


            // adds name of book title
            var bookText = document.createElement("p")
            bookText.textContent = bookName;

            var space = document.createElement("br")

            // Adds book's author
            var bookAuthor = document.createElement("p")
            bookAuthor.textContent = "By: " + totalBooks[i].author_name;

            // adds link to book info which could also include review
            var bookInfoLink = document.createElement("a")
            bookInfoLink.classList = "cyan darken-4"
            bookInfoLink.textContent = "Book info";
            bookInfoLink.href = "https://openlibrary.org" + totalBooks[i].key;
            bookInfoLink.target = "_blank";
            console.log(totalBooks[i].key)

            // adds book's image
            var bookImg = document.createElement("img")
            bookImg.className = "card-image"
            if (totalBooks[i].cover_i) {
                bookImg.src = "https://covers.openlibrary.org/b/id/" + totalBooks[i].cover_i + "-M.jpg";
                bookImg.alt = "Image of " + bookName + " book";
                bookImg.link = "https://openlibrary.org" + totalBooks[i].key;
            }
            else {
                bookImg.alt = "Image of book does not exist";
            }
            // appends elements to page
            bookSearchDiv.appendChild(bookImg);
            bookSearchDiv.appendChild(bookSearchContentDiv);
            bookSearchContentDiv.appendChild(bookDetailDiv);
            linkDiv.appendChild(bookInfoLink)
            bookSearchContentDiv.appendChild(linkDiv);

            bookDetailDiv.appendChild(bookText);
            bookDetailDiv.appendChild(space);
            bookDetailDiv.appendChild(bookAuthor);
            resultContainer.appendChild(bookSearchDiv);
        }


    };
}
var popularbook = function () {
    var bookTypeApiURL = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=LwhrCivpjVUn7aHdoGyFgKbhLI9dumRs";
    var bookType = "";
    fetch(bookTypeApiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var bookTypeData = data.results;
                    bookType = randomBookType(bookTypeData);
                    randomTopSeller(bookType);
                })
            }

        })
        .catch(function (error) {
            // alert if something goes wrong
            alert("There is an error with request");
        });

}
var randomBookType = function (data) {
    var bookTypeLength = data.length;
    var randomType = Math.floor(Math.random() * bookTypeLength);
    var bookType = data[randomType].list_name_encoded;

    return bookType;
}
var randomTopSeller = function (bookType) {
    var popularBookApi = "https://api.nytimes.com/svc/books/v3/lists/current/" + bookType + ".json?api-key=LwhrCivpjVUn7aHdoGyFgKbhLI9dumRs";
    fetch(popularBookApi)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var popularCategory = data.results.display_name;
                    var popularBook = data.results.books;
                    console.log(popularCategory);
                    listTopSeller(popularBook);
                    console.log(popularBook);

                })
            }

        })
        .catch(function (error) {
            // alert if something goes wrong
            alert("There is an error with request");
        });
}
var listTopSeller = function (data) {
    if (data.length < 5) {
        var loopLength = data.length;
    }
    else {
        var loopLength = 5;
    }

    for (var i = 0; i < loopLength; i++) {

        var bookDiv = document.createElement("div")
        bookDiv.classList = "card horizontal col small s6 m5 space"

        var bookContentDiv = document.createElement("div")
        bookContentDiv.className = "card-stacked"

        var bookDetailDiv = document.createElement("div")
        bookDetailDiv.className = "card-content"

        var linkDiv = document.createElement("div")
        linkDiv.className = "card-action"


        // adds name of book title
        var bookText = document.createElement("p")
        bookText.textContent = data[i].title;

        var space = document.createElement("br")

        // Adds book's author
        var bookAuthor = document.createElement("p")
        bookAuthor.textContent = "By: " + data[i].author;

        // adds link to book info which could also include review

        var bookInfoLink = document.createElement("a")
        if (data[i].book_review_link != "") {
            bookInfoLink.classList = "cyan darken-4"
            bookInfoLink.textContent = "Book review";
            bookInfoLink.href = data[i].book_review_link;
            bookInfoLink.target = "_blank";
            console.log(data[i].book_review_link);
        }

        // adds book's image
        var bookImg = document.createElement("img")
        bookImg.className = "card-image"
        bookImg.src = data[i].book_image;
        bookImg.alt = "Image of " + data[i].title + " book";

        // appends elements to page
        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(bookContentDiv);
        bookContentDiv.appendChild(bookDetailDiv);
        linkDiv.appendChild(bookInfoLink)
        bookContentDiv.appendChild(linkDiv);

        bookDetailDiv.appendChild(bookText);
        bookDetailDiv.appendChild(space);
        bookDetailDiv.appendChild(bookAuthor);
        popularContainerEl.appendChild(bookDiv);

    };
}

searchEl.addEventListener("submit", searchBook);

resultContainer.addEventListener("click", function (event) {
    if (event.target.matches("img")) {
        console.log(event.target.parentNode);
        var saveimg = event.target.src;
        console.log(saveimg)

        var linkValue = event.target.link;
        console.log(linkValue)
        // recentSearchEl.appendChild(saveimg);
    }
});

popularbook(); 