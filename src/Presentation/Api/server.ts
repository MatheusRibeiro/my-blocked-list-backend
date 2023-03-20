// Required for Decorators
import 'reflect-metadata'
// DI
import '@src/Infrastructure/DependencyInjection'
// API and Router
import express, { json } from 'express'
import { router } from './Base/Decorators/Controller'
// Decorated controllers with its routes
import './Controllers/Authentication'
import './Controllers/Complaint'

const app = express()

app.use(json())
app.use(router)

app.listen(8080)
console.log('Application is running on port 8080')
