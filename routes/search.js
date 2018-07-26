const express = require('express');
const {Pool} = require('pg')
const QiitaOrganizations = require('../models/QiitaOrganizations')

const router = express.Router()
const pool = new Pool()
let caches = []

router.get('/', async function(req, res, next) {
    res.render('search', {organizations: caches})
})

router.post('/', async function(req, res, next) {
    let client
    try {
        client = await pool.connect()
        console.log('address = ' + req.body.address)
        const result = await QiitaOrganizations.searchByAddress(client, req.body.address)
        caches = result.rows
        client.release()
        console.log(caches)
        res.render('search', {word: req.body.address, organizations: caches})
    } catch (e) {
        if (client) {client.release()}
        next(e)
    }
})

module.exports = router
