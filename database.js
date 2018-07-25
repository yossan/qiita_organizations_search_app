const tbname = 'organizations'

// Connect Database

function createtb(client) {
    let stmt = 
    `CREATE TABLE ${tbname} (
        name TEXT PRIMARY KEY,
        thumbnail TEXT,
        num_of_members INTEGER,
        address TEXT,
        description TEXT,
        url TEXT
    );`

    return client.query(stmt)
}

function droptb(client) {
    let stmt = `DROP TABLE IF EXISTS ${tbname};`
    return client.query(stmt)
}

// function initialize()
module.exports.initialize = (async (client) => {
    try { 
        await droptb(client)
        await createtb(client)
    } catch (e) {
        throw e
    }
})

// function insert(organizations)
module.exports.insert = (async (organizations) => {
    const stmt = `INSERT INTO ${tbname} (name, thumbnil, num_of_members, address, description, url) values (?, ?, ?, ?, ?, ?)`
    for (const o of organizations) {
        try {
            client.query(stmt, [
                o.name,
                o.thumbnail,
                o.num_of_members,
                o.address,
                o.description,
                o.url
            ])
        } catch (e) {
        }
    }
})

