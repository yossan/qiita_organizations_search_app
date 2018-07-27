const express = require('express');
const {Pool} = require('pg')
const QiitaOrganizations = require('../models/QiitaOrganizations')

const router = express.Router()
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:true
})

router.post('/', async function(req, res, next) {
    let client
    try {
        client = await pool.connect()
        const input = req.body.address.replace('　', ' ')
        let inputs = input.split(' ')
        const result = await QiitaOrganizations.searchByAddress(client, inputs)
        const organizations = result.rows
        client.release()
        res.render('search', {word: req.body.address, organizations: organizations})
    } catch (e) {
        if (client) {client.release()}
        next(e)
    }
})

module.exports = router
