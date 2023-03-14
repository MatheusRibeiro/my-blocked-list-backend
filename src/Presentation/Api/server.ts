import 'reflect-metadata'

import express from 'express'

import '../../DependencyInjection'
import router from './router'

const app = express()

app.use(express.json())
app.use(router)

app.listen(8080)
console.log('Application is running on port 8080')
