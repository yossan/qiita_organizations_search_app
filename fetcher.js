const EventEmitter = require('events').EventEmitter
const request      = require('superagent')

class Fetcher extends EventEmitter {
    start (page) {
        this._fetchAt(page)
            .then((html) => {
                const next = this._fetchAt
                this.emit('PageContentLoaded', html, page, next) 
            })
            .catch((err) => {
                this.emit('error', err)
            })
    }

    _fetchAt (page) {
        const url = `https://qiita.com/organizations?page=${page}`
        return new Promise((resolve, reject) => {
            request
                .get(url)
                .then(res => {
                    resolve(res.text)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}


module.exports = new Fetcher()
