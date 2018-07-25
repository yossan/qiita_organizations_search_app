const dotenv = require('dotenv').config()
const {Client} = require('pg')

const client = new Client()
const fetcher = require('./fetcher')
const parser  = require('./parser')
const database = require('./database')

// Add Events

client.on('error', (err) => {
    console.log(err)
})

fetcher.on('PageContentLoaded', (html, currentPage, next) => {
    /*
    const organizations = parser.parse(html)
    if (organizations.length < 1) {
        next(-1)
        return
    }
    database.update(organizations)
    */

    console.log(html)
    //next(currentPage+1)
    client.end()
})

fetcher.on('err', (err) => {
})

// Run app

client.connect()

database
    .initialize(client)
    .then(() => {
        console.log('Initialize success')
        fetcher.start(0)
    })
    .catch((e) => {
        console.log('Initialize failure')
        client.end()
    })

