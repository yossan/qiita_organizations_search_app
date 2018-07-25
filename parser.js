const jsdom   = require('jsdom')
const {JSDOM} = jsdom

class OrganizationDomParser {

    constructor (rawDom) {
        this.rawDom = rawDom
    }
    
    parse() {
        let organization = {}

        const [iconDom, profileDom, chartDom] = this.rawDom.getElementsByTagName('div')
        const [nameDom, descDom, attDom] = profileDom.children
        const [groupIconDom, numDom, urlIconDom, urlDom, addressIconDom, addressDom] = attDom.children

        const thumbnail = iconDom.getElementsByTagName('img')[0].src
        const name = nameDom.textContent
        const desc = descDom.textContent
        const numOfMembers = parseInt(numDom.textContent)
        const url = urlDom.textContent
        const address = addressDom !== undefined ? addressDom.textContent : ''

        return {
            name: name,
            thumbnail: thumbnail,
            numOfMembers: numOfMembers,
            url: url,
            description: desc,
            address: address,
        }
    }
}

function parse(html) {
    const dom = new JSDOM(html)
    const document = dom.window.document
    let organizationsDom = document.body.getElementsByTagName('ul')[2]
    let organizations = []
    for (const childDom of organizationsDom.children) {
        if (childDom.tagName !== 'LI') {
            // footer
            break
        } 

        const organization = (new OrganizationDomParser(childDom)).parse()
        organizations.push(organization)
    }
    return organizations
}

module.exports.parse = parse
