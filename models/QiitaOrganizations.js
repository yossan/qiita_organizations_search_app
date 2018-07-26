const tbname = 'organizations'

// Connect Database

function createtb(client) {
    let stmt = 
    `CREATE TABLE ${tbname} (
        name TEXT,
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
module.exports.insert = (async (client, organizations) => {
    const stmt = `INSERT INTO ${tbname} (name, thumbnail, num_of_members, address, description, url) values ($1, $2, $3, $4, $5, $6)`
    for (const o of organizations) {
            await client.query(stmt, [
                o.name,
                o.thumbnail,
                o.num_of_members,
                o.address,
                o.description,
                o.url
            ])
    }
})

// function searchByAddress(address)
module.exports.searchByAddress = (async (client, addresses) => {
    const likes = addresses.reduce((accumurator, address) => {
        const num = accumurator.length + 1
        const like = `address LIKE $${num}`
        accumurator.push(like)
        return accumurator
    }, [])
    const values = addresses.reduce((accumurator, address) => {
        const value = `%${address}%`
        accumurator.push(value)
        return accumurator
    }, [])

    const stmt = `SELECT * FROM ${tbname} WHERE ${likes.join(' OR ')}`
    console.log(stmt)
    console.log(values)
    return client.query(stmt, values)

    /*
module.exports.searchByAddress = (async (client, address) => {
    const stmt = `SELECT * from ${tbname} WHERE address LIKE $1`
    return client.query(stmt, [`%${address}%`])
    */
})
