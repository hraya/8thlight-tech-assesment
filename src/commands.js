const axios = require('axios');
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const optionsListLocation = path.join(__dirname, 'optionList.json')
const readingListLocation = path.join(__dirname, 'readingList.json')
const bookOptions = []
const API_KEY = process.env.API_KEY;


const getBooks = async (subject) => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${subject}&maxResults=5&key=${API_KEY}`)
        .then(res => {
            res.data.items.map((book,i) => {
                const bookInfo = {
                    Option: i,
                    title:book.volumeInfo.title,
                    Author:book.volumeInfo.authors[0],
                    Publisher: book.volumeInfo.publisher
                }
                console.log(bookInfo)
                bookOptions.push(bookInfo)
            });
            saveData(bookOptions,optionsListLocation)
            console.log(`Would you like to save a book to your reading list?`)
            console.log(`Run command "node src/index.js results"`)
            
        })
        .catch(err => console.log(err))
}


const getList = (fileLocation) => {
    const list =fs.readFileSync(fileLocation).toString()

    return JSON.parse(list)
}

const saveData = (data, file) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
}



module.exports = {
    getBooks,
    getList,
    saveData,
    optionsListLocation,
    readingListLocation
}


