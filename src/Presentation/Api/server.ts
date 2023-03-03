import express, { Request, Response, Router } from 'express'
import router from './router'
const app = express()

app.use(router)

app.listen(8080)
console.log('Application is running on port 8080')
