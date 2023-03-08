import 'reflect-metadata'

import bodyParser from 'body-parser'
import express from 'express'

import '../../DependencyInjection'
import router from './router'

const app = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use(router)

app.listen(8080)
console.log('Application is running on port 8080')
