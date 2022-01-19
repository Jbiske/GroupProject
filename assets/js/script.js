var searchInput = document.querySelector("#book");
var searchEl = document.querySelector("#search-form");
var resultContainer = document.querySelector(".resultContainer");
var popularContainerEl = document.querySelector(".popularContainer");
var recentSearchEl = document.querySelector(".recentSearch");
var popularTitle = document.querySelector(".popularBookTitle");

var savedBooks = [];

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
            bookSearchDiv.classList = "card horizontal col small s12 m12 l5"

            var bookSearchContentDiv = document.createElement("div")
            bookSearchContentDiv.className = "card-stacked"

            var bookDetailDiv = document.createElement("div")
            bookDetailDiv.className = "card-content center-align flow-text"

            var linkDiv = document.createElement("div")
            linkDiv.className = "card-action flow-text"


            // adds name of book title
            var bookText = document.createElement("p")
            bookText.textContent = bookName;

            var space = document.createElement("br")

            // Adds book's author
            var bookAuthor = document.createElement("p")
            bookAuthor.textContent = "By: " + totalBooks[i].author_name;

            // adds link to book info which could also include review
            var bookInfoLink = document.createElement("a")
            bookInfoLink.classList = "cyan-text text-darken-4"
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
                    popularTitle.textContent = "Top 5 " + popularCategory + " books";
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
        bookDiv.classList = "card horizontal col small s12 m12 l5 hoverable"

        var bookContentDiv = document.createElement("div")
        bookContentDiv.className = "card-stacked"

        var bookDetailDiv = document.createElement("div")
        bookDetailDiv.className = "card-content flow-text"

        var linkDiv = document.createElement("div")
        linkDiv.className = "card-action center-align flow-text"


        // adds name of book title
        var bookText = document.createElement("p")
        bookText.textContent = data[i].title;

        var space = document.createElement("br")

        // Adds book's author
        var bookAuthor = document.createElement("p")
        bookAuthor.textContent = "By: " + data[i].author;

        // adds link to book info which could also include review

        var bookInfoLink = document.createElement("a")
        bookInfoLink.classList = "cyan-text text-darken-4"
        bookInfoLink.textContent = "Book info";
        bookInfoLink.href = data[i].amazon_product_url;
        bookInfoLink.target = "_blank";


        var bookReviewLink = document.createElement("a")
        if (data[i].book_review_link != "") {
            bookReviewLink.classList = "cyan-text text-darken-4"
            bookReviewLink.textContent = "Book review";
            bookReviewLink.href = data[i].book_review_link;
            bookReviewLink.target = "_blank";
            console.log(data[i].book_review_link);
        }


        // adds book's image
        var bookImg = document.createElement("img")
        bookImg.className = "card-image"
        bookImg.src = data[i].book_image;
        bookImg.alt = "Image of " + data[i].title + " book";
        bookImg.link = data[i].amazon_product_url;

        // appends elements to page
        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(bookContentDiv);
        bookContentDiv.appendChild(bookDetailDiv);
        linkDiv.appendChild(bookInfoLink);
        linkDiv.appendChild(bookReviewLink);
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
        var saveImg = event.target.src;
        console.log(saveImg)

        var linkValue = event.target.link;
        console.log(linkValue)

        var existingImg = 0;
        for (i = 0; i < savedBooks.length; i++) {
            if (savedBooks[i].image == event.target.src) {
                existingImg = 1;
            }
        }
        if (existingImg == 1) {

        }
        else {
            createSavedBooks(saveImg, linkValue)
            saveClicked(saveImg, linkValue);
        }

    }
});

popularContainerEl.addEventListener("click", function (event) {
    if (event.target.matches("img")) {
        console.log(event.target.parentNode);
        var saveImg = event.target.src;
        console.log(saveImg)

        var linkValue = event.target.link;
        console.log(linkValue)

        var existingImg = 0;
        for (i = 0; i < savedBooks.length; i++) {
            if (savedBooks[i].image == event.target.src) {
                existingImg = 1;
            }
        }
        if (existingImg == 1) {

        }
        else {
            createSavedBooks(saveImg, linkValue)
            saveClicked(saveImg, linkValue);
        }
    }
});



var createSavedBooks = function (saveImg, linkValue) {
    var infoLink = document.createElement("a")
    infoLink.href = linkValue;
    infoLink.target = "_blank";

    var bookImg = document.createElement("img")
    bookImg.className = "card-image"
    bookImg.src = saveImg;

    infoLink.appendChild(bookImg);
    recentSearchEl.appendChild(infoLink);
}
var saveClicked = function (saveImg, linkValue) {
    var savedObj = {
        image: saveImg,
        bookLink: linkValue,
    }
    savedBooks.push(savedObj);
    save();
}

// function to load recent search list from local storage
var load = function () {
    var searchHistory = localStorage.getItem("Novel_Experiences")
    if (!searchHistory) {
        return false;
    }
    searchHistory = JSON.parse(searchHistory);

    for (i = 0; i < searchHistory.length; i++) {
        savedBooks.push(searchHistory[i]);
        var image = searchHistory[i].image;
        var linkValue = searchHistory[i].bookLink;

        createSavedBooks(image, linkValue);

    }


}

var save = function () {
    localStorage.setItem("Novel_Experiences", JSON.stringify(savedBooks));
}

popularbook();
load();