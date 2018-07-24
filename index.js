const dotenv = require('dotenv').config()

const fetcher = require('./fetcher')
const parser  = require('./parser')
const database = require('./database')

database.initialize()

/*
featcher.on('', (html, currentPage, next) => {
    const organizations = parser.parse(html)
    if (organizations.length < 1) {
        next(-1)
        return
    }
    database.update(organizations)
    next(currentPage+1)
})

fetcher.start(0)
*/
