const config = require('../config')

const routes = module.exports = require('next-routes')()

const locale = `/:locale(${config.AVAILABLE_LOCALES.join('|')})?`

routes
  .add('home', locale, 'index')
  .add('login', `${locale}/login`)
  .add('profile', `${locale}/profile`)
  .add('register', `${locale}/register`)
