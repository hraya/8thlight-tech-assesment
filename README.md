# 8th Light Tech Assesment
> Humberto Raya Jr

#### Requirments
* Node installed on local system. If not [click here](https://nodejs.org/en/) to install NodeJs from the NodeJs source
* API Key for the [Google Books API](https://developers.google.com/books/docs/overview)


## MVP
This application should allow you to:
* Type in a query and display a list of 5 books matching that query.
* Each item in the list should include the book's author, title, and publishing company.
* A user should be able to select a book from the five displayed to save to a “Reading List”
* View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.

## Quick Start
1. Run `npm install` to install all necessary dependencies.
2. Create a `.env` file in the root directory.
3. Inside the `.env` file add `API_KEY=<Given Google API KEY>` to be able to run search.

### CLI (npm)
* location - `src/index.js`
* commands
  * View Reading List - `node src/index.js list`
  * View Search Results - `node src/index.js results`
  * search - `node src/index.js search <subject>`