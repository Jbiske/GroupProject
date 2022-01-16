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

searchEl.addEventListener("submit", searchBook);