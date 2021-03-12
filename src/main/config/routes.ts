import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  const path = `${__dirname}` + '/../routes'
  app.use('/api', router)
  readdirSync(path)
    .map(async file => {
      if (!file.includes('.test.')) {
        (await import(`../routes/${file}`)).default(router)
      }
    })
}
