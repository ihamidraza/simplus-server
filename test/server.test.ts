import * as mocha from 'mocha'
import * as chai from 'chai'
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

import {app, server} from '../src/bin/server'

describe('Server', () => {
    before( done => {
        done()
    })

    after(done => {
        server.close()
        done()
    })

    it('Server should run and have a ping path', done => {
        chai.request(app).get('/ping').then( data => {
            chai.expect(data.status).to.equal(200)
            done()
        }).catch(err => {
            done(err)
        })
    })

    it('Server should have an access to blueprint', done => {
        chai.request(app).get('/blueprint').then( data => {
            chai.expect(data.status).to.equal(200)
            done()
        }).catch(done)
    })
})