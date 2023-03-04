import 'reflect-metadata'

import bodyParser from 'body-parser'
import express, { Request, Response, Router } from 'express'

import "./dependencyInjection"
import router from './router'

const app = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use(router)

app.listen(8080)
console.log('Application is running on port 8080')
