// Required for Decorators
import 'reflect-metadata'
// DI
import '@src/Infrastructure/DependencyInjection'
// API and Router
import express, { json } from 'express'
import { router } from './Base/Decorators/Controller'
import apiSettings from '@src/Infrastructure/Config/api'
// Decorated controllers with its routes
import './Controllers/Authentication'
import './Controllers/Contact'
import './Controllers/WatchedContact'
import './Controllers/UserNotification'

void dbSetup().then(() => {
    const app = express()

    app.use(json())
    app.use(router)

    const { port } = apiSettings
    app.listen(port)

    console.log(`Application is running on port ${port}`)
})

// eslint-disable-next-line @typescript-eslint/no-empty-function
async function dbSetup(): Promise<void> {}
