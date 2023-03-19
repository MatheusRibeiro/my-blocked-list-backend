import 'reflect-metadata'

import express, { json } from 'express'
import '@src/Infrastructure/DependencyInjection'
import { router } from './Base/Decorators/Controller'
import './Controllers/Authentication'
import './Controllers/Complaint'

const app = express()

app.use(json())
app.use(router)

app.listen(8080)
console.log('Application is running on port 8080')
