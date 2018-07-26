const dotenv = require('dotenv').config()
const {Client} = require('pg')

const client = new Client()
const fetcher = require('./fetcher')
const parser  = require('./parser')
const database = require('../models/QiitaOrganizations')

// Add Events

client.on('error', (err) => {
    console.log('client occours error')
    console.log(err)
})

fetcher.on('PageContentLoaded', async (html, page) => {
    const organizations = parser.parse(html)
    console.log(`page = ${page}, organizations.length = ${organizations.length}`)
    if (organizations.length < 1) {
        console.log('Completed the database setup 😆')
        client.end()
    } else {
        try {
            await database.insert(client, organizations)
        } catch (e) {
            console.log(e)
        }
        fetcher.start(page+1)
    }
})

fetcher.on('error', (err) => {
    console.log('fetcher occurs error')
    console.log(err)
    client.end()
})

// Run app

client.connect()

database
    .initialize(client)
    .then(() => {
        console.log('Succeeded to initialize database')
        fetcher.start(1)
    })
    .catch((e) => {
        console.log('database occurs error')
        console.log(e)
        client.end()
    })

