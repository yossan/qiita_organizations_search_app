const {Client} = require('pg')

const client = new Client()
const tbname = 'organizations'

// Connect Database
client.connect()

// function initialize()
module.exports.initialize = (async () => {
    try { 
        let stmt = 
        `CREATE TABLE IF NOT EXISTS ${tbname} (
            name TEXT PRIMARY KEY,
            thumbnail TEXT,
            num_of_members INTEGER,
            url TEXT,
            desc TEXT,
            address TEXT
        );`
        const ret = await client.query(stmt)
        console.log(ret)
    } catch (e) {
        console.log('Error occurs: ' + e)
    }

    client.end()
})

// function update(organizations)
module.exports.update = (async (organizations) => {
})
