# NOVEL EXPERIENCES 

## Description
* A responsive website where you can search for books, have your recent searches saved, and see a list of popular books from New York Time's Best Seller List.
----
## User Story

    AS A book reader
    I WANT to find detailed information about a book
    SO THAT I know which books I want to read

---
## Acceptance Criteria
    GIVEN I am looking for a certain book
    WHEN I enter the title in the search bar and click search
    THEN I am presented with the book cover image, title, and author
    WHEN I click on the link to that book
    THEN I am presented with more information about the book
    WHEN I scroll down
    THEN I am shown the book covers of the link I clicked on
    WHEN I scroll further down
    THEN I see a list of popular books

---
## Website
https://jbiske.github.io/Novel_Experiences/

---
## Tools
* HTML
* CSS
    * Materialize Framework
* JavaScript
* Open Library API
* New York Times Best Seller API
----
## Challenges
* Materialize Framework
    * Responsiveness
        * There were a few responsive misses with the materialize framework, that I used our own stylesheet to fix.
        * The cards with the recent searches were not responsive.
* Open Library API
    * From hitting search button to the results displaying, the load time is slow.
    * If a user clicks on a link, the open library website also takes time to load.
* New York Time's Best Seller List API
    * Not all the books have a review associated with them.
    * You also have to be subscribed to NYT in order to read the review
--- 
## Future Development Options
* Wishlist
    * cards are aligned in the center
    * recent searches doesn't show copies of a search result if clicked on twice
    * Display reviews for every book on our website when the book is clicked on

