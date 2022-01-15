var searchInput = document.querySelector("#book");
var searchEl = document.querySelector("#search-form");
var resultContainer = document.querySelector(".resultContainer")

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

}

// list the book results
var listBooks = function (bookSearch) {
    resultContainer.textContent = "";
    console.log(bookSearch);
    var totalBooks = bookSearch.docs

    // loop results to print in page
    for (var i = 0; i < totalBooks.length; i++) {
        var bookName = totalBooks[i].title;
        console.log(bookName);

        var bookText = document.createElement("p")
        bookText.textContent = bookName;

        resultContainer.appendChild(bookText);

    };

}

searchEl.addEventListener("submit", searchBook)