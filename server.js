const express = require('express')
const next = require('next')
const routes = require('./src/app/routes')
// const currentLocale = require('./src/app/withLocale').currentLocale
const compression = require('compression')
const favicon = require('serve-favicon')
const path = require('path')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: !dev })
const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  // req.locale = currentLocale(req.originalUrl)
  app.render(req, res, route.page, query)
})

app.prepare()
  .then(() => {
    const server = express()
    server.use(compression())
    server.use(favicon(path.join(__dirname, 'static/favicon.ico')))
    server.use(cookieParser())

    server.use(handler)

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
