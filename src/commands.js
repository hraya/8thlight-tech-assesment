const axios = require('axios');
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const listLocation = path.join(__dirname, 'optionList.json')

const API_KEY = process.env.API_KEY;


const getBooks = async (subject) => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${subject}&maxResults=5&key=${API_KEY}`)
        .then(res => {
            res.data.items.map((book,i) => {
                const bookInfo = {
                    Option: i + 1,
                    title:book.volumeInfo.title,
                    Author:book.volumeInfo.authors[0],
                    Publisher: book.volumeInfo.publisher
                }
                console.log(bookInfo)
                fs.appendFileSync(listLocation, JSON.stringify(bookInfo, null, 2))
            }, console.log(`Run command "node src/index.js list" to view options`))
        }).catch(err => console.log(err))
}

const getOptionsList = () => {
    const optionsList = fs.readFileSync(listLocation).toString()

    return JSON.parse(optionsList)
}

const saveOption = (book) => {
    fs.writeFileSync(listLocation, JSON.stringify(book, null, 2))
}



module.exports = {
    getBooks,
    getOptionsList,
    saveOption
}


