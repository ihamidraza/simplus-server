require('dotenv').config()

import * as express from 'express'
import {Express} from 'express'
import {Server} from 'http'
import {log} from '../log'
import * as bodyParser from 'body-parser'

/**
 * Server initialization and add middlewares
 */
export const app: Express = express()


app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Cache-Control","no-cache, no-store, must-revalidate")
    next()
})


/**
 * Server routing
 */

// CODE HERE

/**
 * Routing after
 */
app.get('/ping', (req, res, next) => {res.sendStatus(200)})
app.use('/blueprint', express.static('docs', {extensions : ['html'], index : 'blueprint.html'}))

/**
 * Error handling
 */

app.use((error, req, res, next) => {
    
    log.error(error)
    
    res.status(500)
    
    if( process.env.ENV === 'development' )
        res.send(error)
    else
        res.end()
})


/** 
 * Launch server
 */
const SERVER_PORT = 3005

export const server: Server = app.listen(SERVER_PORT, null, err => {
    if(err)
        log.error(err)
    else
        log.info("Server is running on port ", SERVER_PORT)
})