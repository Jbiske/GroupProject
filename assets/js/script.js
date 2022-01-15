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
        if (totalBooks[i].lending_edition_s) {

            // adds name of book title
            var bookText = document.createElement("p")
            bookText.textContent = bookName;

            // Adds book's author
            var bookAuthor = document.createElement("p")
            bookAuthor.textContent = "By: " + totalBooks[i].author_name;

            // adds link to book info which could also include review
            var bookInfoLink = document.createElement("a")
            bookInfoLink.textContent = "Book info";
            bookInfoLink.href = "https://openlibrary.org" + totalBooks[i].key;
            bookInfoLink.target = "_blank";
            console.log(totalBooks[i].key)

            // adds book's image
            var bookImg = document.createElement("img")
            bookImg.src = "https://covers.openlibrary.org/b/id/" + totalBooks[i].cover_i + "-M.jpg";
        }

        // appends elements to page
        resultContainer.appendChild(bookText);
        resultContainer.appendChild(bookAuthor);
        resultContainer.appendChild(bookInfoLink);
        resultContainer.appendChild(bookImg);
    };
}

searchEl.addEventListener("submit", searchBook);